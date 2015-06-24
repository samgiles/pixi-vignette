'use strict';
var AbstractFilter = require('pixi.js').AbstractFilter;

function VignetteFilter(options) {
	var opts = options || {};

	AbstractFilter.call(this,
		// vertex shader
		null,
		// fragment shader
		fragShader,
		{
			size:        { type: '1f', value: opts.size || 0.5 },
			amount:      { type: '1f', value: opts.amount || 0.5 },
			focalPointX: { type: '1f', value: opts.focalPointX || 0.5 },
			focalPointY: { type: '1f', value: opts.focalPointY || 0.5 }
		}
	);
}


VignetteFilter.prototype = Object.create(AbstractFilter.prototype);
VignetteFilter.prototype.constructor = VignetteFilter;
module.exports = VignetteFilter;

Object.defineProperties(VignetteFilter.prototype, {
	focalPointX: {
		get: function() { return this.uniforms.focalPointX.value; },
		set: function(value) { this.uniforms.focalPointX.value = value; }
	},
	focalPointY: {
		get: function() { return this.uniforms.focalPointY.value; },
		set: function(value) { this.uniforms.focalPointY.value = value; }
	},
	size: {
		get: function() {
			return this.uniforms.size.value;
		},
		set: function(value) {
			this.uniforms.size.value = value;
		}
	},
	amount: {
		get: function() {
			return this.uniforms.amount.value;
		},
		set: function(value) {
			this.uniforms.amount.value = value;
		}
	}
});

var fragShader = [
	"precision mediump float;",
	"varying vec2 vTextureCoord;",
	"uniform sampler2D uSampler;",
	"uniform float size;",
	"uniform float amount;",
	"uniform float focalPointX;",
	"uniform float focalPointY;",
	"void main() {",
	"	vec3 rgb = texture2D(uSampler, vTextureCoord).xyz;",
	"	float dist = distance(vTextureCoord, vec2(focalPointX, focalPointY));",
	"	rgb *= smoothstep(0.8, size * 0.799, dist * (0.5 * amount + size));",
	"	gl_FragColor = vec4(vec3(rgb), 1.0);",
	"}"
].join('');
