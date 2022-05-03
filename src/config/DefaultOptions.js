/**
 * Default options for ScrollTrigger
 * 默认选项，这个函数就是一个构造函数，通过new来创建一个默认选项的实例对象
 */
export default function() {
	/**
	 * The default options for a trigger
	 * 触发器的默认选项
	 *
	 * @type {
	 * {
	 *  once: boolean,
	 *  offset: {
	 *    viewport: {
	 *      x: number|(function(frame, direction)),
	 *      y: number|(function(frame, direction))
	 *    },
	 *    element: {
	 *      x: number|(function(rect, direction)),
	 *      y: number|(function(rect, direction))
	 *    }
	 *  },
	 *  toggle: {
	 *    class: {
	 *      in: string|string[],
	 *      out: string|string[]
	 *    },
	 *  callback: {
	 *    in: {TriggerInCallback},
     *    visible: (function()),
	 *    out: (function())
	 *  }
	 * }
	 * }}
	 */
	this.trigger = {
		once: false,
		offset: {
			viewport: {
				x: 0,
				y: 0
			},
			element: {
				x: 0,
				y: 0
			}
		},
		toggle: {
			class: {
				in: 'visible',
				out: 'invisible'
			},
			callback: {
				in: null,
        		visible: null,
				out: null
			}
		}
	}

    /**
     * The `in` callback is called when the element enters the viewport
	 * 进入视口时调用的回调
     * @callback TriggerInCallback
     * @param {{x: Number, y: Number}} position
     * @param {string} direction
     */

	/**
	 * The default options for the scroll behaviour
	 * 滚动行为的默认选项
	 * @type {
	 * {
	 *  sustain: number,
	 *  element: Window|HTMLDocument|HTMLElement,
	 *  callback: {ScrollCallback},
	 *  start: (function()),
	 *  stop: (function()),
	 *  directionChange: (function(direction: {string}))
	 * }
	 * }
	 */
	this.scroll = {
		sustain: 300,
		element: window,
		callback: () => {},
		start: () => {},
		stop: () => {},
		directionChange: () => {}
	}

    /**
     * The scroll callback is called when the user scrolls
	 * 滚动时调用的回调
     * @callback ScrollCallback
     * @param {{x: Number, y: Number}} position
     * @param {string} direction
     */
}
