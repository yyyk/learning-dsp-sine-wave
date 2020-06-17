<template>
  <svg
    class="wave-plot"
    :viewBox="`0 0 ${width} ${height}`"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid slice"
  >
    <g :transform="`translate(${margin.left}, ${margin.top})`">
      <g>
        <path
          shape-rendering="geometricPrecision"
          fill="none"
          stroke="#2C3E50"
          stroke-width="1"
          :d="line(wave)"
        />
      </g>
      <g v-axis:y="[scale, innerWidth]" />
      <g v-axis:x="[scale]" :transform="`translate(0, ${innerHeight})`" />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import * as d3 from 'd3'
import { Sine } from '@/types/WavePlot'

// TODO: sine tables

export default Vue.extend({
  directives: {
    axis(el, binding) {
      const axis = binding.arg
      if (axis) {
        const methodArg = binding.value[0][axis]
        switch (axis) {
          case 'x':
            d3.select(el)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .call(
                d3
                  .axisBottom(methodArg)
                  .ticks(5)
                  .tickFormat((number) => `${number}s`) as any
              )
              .attr('font-size', 24)
              .attr('stroke-width', 1)
              .attr('font-family', 'inherit')
            break
          case 'y':
            d3.select(el)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .call(
                d3
                  .axisLeft(methodArg)
                  .ticks(3)
                  .tickSize(-binding.value[1]) as any
              )
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .call((g: any) => g.select('.domain').remove())
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .call((g: any) =>
                g.selectAll('.tick line').attr('stroke', '#C0C0BB')
              )
              .attr('font-size', 24)
              .attr('font-family', 'inherit')
            break
        }
      }
    }
  },
  props: {
    frequency: {
      type: Number,
      default: 1
    },
    length: {
      type: Number,
      default: 1
    },
    sines: {
      type: Array,
      default: () => []
    } as PropOptions<Sine[]>
  },
  data: () => ({
    innerWidth: 810,
    innerHeight: 480,
    margin: {
      top: 40,
      bottom: 50,
      left: 60,
      right: 60
    }
  }),
  computed: {
    width(): number {
      return this.innerWidth + this.margin.right + this.margin.left
    },
    height(): number {
      return this.innerHeight + this.margin.top + this.margin.bottom
    },
    scale(): {
      x: d3.ScaleLinear<number, number>
      y: d3.ScaleLinear<number, number>
    } {
      const x = d3
        .scaleLinear()
        .domain([0, this.length])
        .range([0, this.innerWidth])
        .interpolate(d3.interpolateRound)
      const y = d3
        .scaleLinear()
        .domain([-1, 1])
        .rangeRound([this.innerHeight, 0])
        .interpolate(d3.interpolateRound)

      return { x, y }
    },
    line(): d3.Line<[number, number]> {
      return d3
        .line()
        .x((d: number[]) => this.scale.x(d[0]))
        .y((d: number[]) => this.scale.y(d[1]))
    },
    wave(): Array<number[]> {
      const wave = []
      const PI_OVER_180 = Math.PI / 180
      for (let i = 0; i <= 360 * this.length; i++) {
        let value = 0
        for (const sine of this.sines) {
          if (!sine) {
            continue
          }
          // Math.pow(2, i / 1200)
          const ratio = sine.ratio || 1
          const coarse = sine.coarse || 0
          const fine = sine.fine || 0
          const detune = 2 ** ((coarse * 100 + fine) / 1200)
          const frequencyOffset = sine.frequencyOffset || 0
          const frequency =
            i * (this.frequency * ratio * detune + frequencyOffset)
          value += sine.level * Math.sin(frequency * PI_OVER_180)
        }
        wave[i] = [i / 360, value]
      }
      return wave
    }
  }
})
</script>

<style lang="scss" scoped></style>
