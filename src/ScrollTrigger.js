/*!
 * ScrollTrigger
 *
 *
 * http://github.com/terwanerik
 *
 * Copyright 2017, Erik Terwan <erik@erikterwan.com>
 * Released under the MIT license.
 *
 * Date: 2017-07-09
 */

/**
 * Created by Erik on 09/07/2017.
 */
import DefaultOptions from './config/DefaultOptions'
// 导入默认选项
import _Trigger from './scripts/Trigger'
import _TriggerCollection from './scripts/TriggerCollection'
import _ScrollAnimationLoop from './scripts/ScrollAnimationLoop'

import extend from 'object-extend'
import './extensions/Array'
//  触发器类
export const Trigger = _Trigger
// 触发器收集管理类
export const TriggerCollection = _TriggerCollection
// 滚动动画循环类
export const ScrollAnimationLoop = _ScrollAnimationLoop
// 默认导出的是 ScrollTrigger 类
// 这个类主要用来做一些管理，比如触发器的管理，动画的管理等等，并连接了上面的类

export default class ScrollTrigger {
	/**
	 * Constructor for the scroll trigger
	 * 构造函数
	 * @param {DefaultOptions} [options=DefaultOptions] options
	 */
	constructor(options) {
		// 解析选项
		this._parseOptions(options)
		// 初始化集合
		this._initCollection()
		// 初始化循环
		this._initLoop()
	}

	/**
	 * Parses the options
	 * 解析选项
	 * @param {DefaultOptions} [options=DefaultOptions] options
	 * @private
	 */
	_parseOptions(options) {
		// 合并传入选项和默认选项
		options = extend(new DefaultOptions(), options)
		// 将默认选项赋值给 scrollOptions, 默认的触发器是传入的触发器，滚动的选项是配置的选项
		this.defaultTrigger = options.trigger
		this.scrollOptions = options.scroll
	}

	/**
	 * Initializes the collection, picks all [data-scroll] elements as initial elements
	 * 初始化集合，挑选所有[data-scroll]元素作为初始元素
	 * @private
	 */
	_initCollection() {
		const scrollAttributes = document.querySelectorAll('[data-scroll]')
		let elements = []

		if (scrollAttributes.length > 0) {
			elements = this.createTriggers(scrollAttributes)
		}

		this.collection = new TriggerCollection(elements)
	}

	/**
	 * Initializes the scroll loop
	 * @private
	 */
	_initLoop() {
		this.loop = new ScrollAnimationLoop({
			sustain: this.scrollOptions.sustain,
			element: this.scrollOptions.element,
			callback: (position, direction) => {
				this._scrollCallback(position, direction)
			},
			start: () => {
				this._scrollStart()
			},
			stop: () => {
				this._scrollStop()
			},
			directionChange: (direction) => {
				this._scrollDirectionChange(direction)
			}
		})
	}

	/**
	 * Callback for checking triggers
	 * @param {{x: number, y: number}} position
	 * @param {string} direction
	 * @private
	 */
	_scrollCallback(position, direction) {
		this.collection.call((trigger) => {
			trigger.checkVisibility(this.scrollOptions.element, direction)
		})

		this.scrollOptions.callback(position, direction)
	}

	/**
	 * When the scrolling started
	 * @private
	 */
	_scrollStart() {
		this.scrollOptions.start()
	}

	/**
	 * When the scrolling stopped
	 * @private
	 */
	_scrollStop() {
		this.scrollOptions.stop()
	}

	/**
	 * When the direction changes
	 * @param {string} direction
	 * @private
	 */
	_scrollDirectionChange(direction) {
		this.scrollOptions.directionChange(direction)
	}

	/**
	 * Creates a Trigger object from a given element and optional option set
	 * @param {HTMLElement} element
	 * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
	 * @returns Trigger
	 */
	createTrigger(element, options) {
		return new Trigger(element, extend(this.defaultTrigger, options))
	}

	/**
	 * Creates an array of triggers
	 * @param {HTMLElement[]|NodeList} elements
	 * @param {Object} [options=null] options
	 * @returns {Trigger[]} Array of triggers
	 */
	createTriggers(elements, options) {
		let triggers = []

		elements.each((element) => {
			triggers.push(this.createTrigger(element, options))
		})

		return triggers
	}

	/**
	 * Adds triggers
	 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
	 * @param {Object} [options=null] options
	 * @returns {ScrollTrigger}
	 */
	add(objects, options) {
		if (objects instanceof HTMLElement) {
			this.collection.add(this.createTrigger(objects, options))

			return this
		}

		if (objects instanceof Trigger) {
			this.collection.add(objects)

			return this
		}

		if (objects instanceof NodeList) {
			this.collection.add(this.createTriggers(objects, options))

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
			this.collection.add(objects)

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
			this.collection.add(this.createTriggers(objects, options))

			return this
		}

		// assume it's a query string
		// 使用 querySelectorAll 获取DOM元素
		this.collection.add(this.createTriggers(document.querySelectorAll(objects), options))

		return this
	}

	/**
	 * Removes triggers
	 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
	 * @returns {ScrollTrigger}
	 */
	remove(objects) {
		if (objects instanceof Trigger) {
			this.collection.remove(objects)

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
			this.collection.remove(objects)

			return this
		}

		if (objects instanceof HTMLElement) {
			this.collection.remove(this.search(objects))

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
			this.collection.remove(this.search(objects))

			return this
		}

		if (objects instanceof NodeList) {
			this.collection.remove(this.search(objects))

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
			this.collection.remove(objects)

			return this
		}

		// assume it's a query string
		this.collection.remove(this.query(objects.toString()))

		return this
	}

	/**
	 * Lookup one or multiple triggers by a query string
	 * @param {string} selector
	 * @returns {Trigger[]}
	 */
	query(selector) {
		return this.collection.query(selector)
	}

	/**
	 * Lookup one or multiple triggers by a certain HTMLElement or NodeList
	 * @param {HTMLElement|HTMLElement[]|NodeList} element
	 * @returns {Trigger|Trigger[]|null}
	 */
	search(element) {
		return this.collection.search(element)
	}

	/**
	 * Reattaches the scroll listener
	 */
	listen() {
		if (this.loop) { return }

		this._initLoop()
	}

	/**
	 * Kills the scroll listener
	 */
	kill() {
		this.loop.kill()
		this.loop = null
	}
}
