import DefaultOptions from '../config/DefaultOptions'
import extend from 'object-extend'
import '../extensions/Array'

export default class ScrollAnimationLoop {
	/**
	 * ScrollAnimationLoop constructor.
	 * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
	 * 初始化一些属性，并且绑定scroll事件
	 * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
	 * @param {ScrollCallback} callback [loop=null] The loop callback
	 */
	constructor(options, callback) {
		this._parseOptions(options)

		if (typeof callback === 'function') {
			this.callback = callback
		}

		this.direction = 'none'
		this.position = this.getPosition()
		this.lastAction = this._getTimestamp()

		this._startRun()

		this._boundListener = this._didScroll.bind(this)
		this.element.addEventListener('scroll', this._boundListener)
	}

	/**
	 * Parses the options
	 *
	 * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
	 * @private
	 */
	_parseOptions(options) {
		let defaults = new DefaultOptions().scroll

		if (typeof options != 'function') {
			defaults.callback = () => {}

            defaults = extend(defaults, options)
		} else {
			defaults.callback = options
		}

		this.element = defaults.element
		this.sustain = defaults.sustain
		this.callback = defaults.callback
		this.startCallback = defaults.start
		this.stopCallback = defaults.stop
		this.directionChange = defaults.directionChange
	}

	/**
	 * Callback when the user scrolled the element
	 * @private
	 */
	_didScroll() {
		const newPosition = this.getPosition()

		if (this.position !== newPosition) {
			let newDirection = this.direction

			if (newPosition.x !== this.position.x) {
				newDirection = newPosition.x > this.position.x ? 'right' : 'left'
			} else if (newPosition.y !== this.position.y) {
				newDirection = newPosition.y > this.position.y ? 'bottom' : 'top'
			} else {
				newDirection = 'none'
			}

			if (newDirection !== this.direction) {
				this.direction = newDirection

                if (typeof this.directionChange === 'function') {
                    this.directionChange(this.direction)
                }
			}

			this.position = newPosition
			this.lastAction = this._getTimestamp()
		} else {
            this.direction = 'none'
        }

		if (!this.running) {
			this._startRun()
		}
	}

	/**
	 * Starts the loop, calls the start callback
	 * @private
	 */
	_startRun() {
		this.running = true

        if (typeof this.startCallback === 'function') {
            this.startCallback()
        }

		this._loop()
	}

	/**
	 * Stops the loop, calls the stop callback
	 * 结束动画循环，调用stop回调
	 * @private
	 */
	_stopRun() {
		this.running = false

        if (typeof this.stopCallback === 'function') {
            this.stopCallback()
        }
	}

	/**
	 * The current position of the element
	 * 该当前元素的坐标
	 * @returns {{x: number, y: number}}
	 */
	getPosition() {
		const left = this.element.pageXOffset || this.element.scrollLeft || document.documentElement.scrollLeft || 0
		const top = this.element.pageYOffset || this.element.scrollTop || document.documentElement.scrollTop || 0

		return { x: left, y: top }
	}

	/**
	 * The current timestamp in ms
	 * @returns {number}
	 * @private
	 */
	_getTimestamp() {
		return Number(Date.now())
	}

	/**
	 * One single tick of the animation
	 * 一个单独的动画帧，无限递归调用_loop
	 * @private
	 */
	_tick() {
		// 执行回调，传入当前的坐标，及方向
		this.callback(this.position, this.direction)

		const now = this._getTimestamp()
		// 如果超过了sustain时间，就停止
		if (now - this.lastAction > this.sustain) {
			this._stopRun()
		}
		// 如果还在运行，就继续执行
		if (this.running) {
			this._loop()
		}
	}

	/**
	 * Requests an animation frame
	 * 每帧调用一次_tick
	 * @private
	 */
	_loop() {
		const frame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			((callback) => { setTimeout(callback, 1000 / 60) })

		frame(this._tick.bind(this))
	}

	/**
	 * Kills the loop forever
	 */
	kill() {
		this.running = false
		this.element.removeEventListener('scroll', this._boundListener)
	}
}
