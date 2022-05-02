# ScrollTrigger
[![Build](https://github.com/terwanerik/ScrollTrigger/workflows/Build/badge.svg)](https://github.com/terwanerik/ScrollTrigger/actions?query=workflow%3ABuild)
[![Deploy](https://github.com/terwanerik/ScrollTrigger/workflows/Deploy/badge.svg)](https://github.com/terwanerik/ScrollTrigger/actions?query=workflow%3ADeploy)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/terwanerik/ScrollTrigger/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/terwanerik/ScrollTrigger.svg)](https://github.com/terwanerik/ScrollTrigger/issues)
[![GitHub release](https://img.shields.io/github/release/terwanerik/ScrollTrigger.svg)](https://github.com/terwanerik/ScrollTrigger/releases)
[![npm (scoped)](https://img.shields.io/npm/v/@terwanerik/scrolltrigger)](https://www.npmjs.com/package/@terwanerik/scrolltrigger)

Let your page react to scroll changes.  
使你的页面由滚动的变化而做出反应

The most basic usage of ScrollTrigger is to trigger classes based on the current scroll position. E.g. when an element enters the viewport, fade it in. You can add custom offsets per element, or set offsets on the viewport (e.g. always trigger after the element reaches 20% of the viewport)  
更多的关于 ScrollTrigger 的用法是触发器类型是基于当期的滚动坐标。例如当一个元素进入了视口，使其淡入。您可以为每个元素添加自定义偏移量，或者在视口上设置偏移量。（例如，总是在元素到达视口20%时触发）


When using the callbacks ScrollTrigger becomes really powerfull. You can run custom code when an element enters / becomes visible, and even return Promises to halt the trigger if the callback fails. This makes lazy loading images very easy.  
当使用回调时，ScrollTrigger将变得非常强大。当一个元素进入或即将变为可见时你可以执行自定义代码，甚至也可以 return Promise 使其停止该触发器如果该回调失败。这使得懒加载图片更加简单。（这里可能表达的意思是可以返回一个Promise  如果未来Promise变成reject 可以停止触发器）

## Installation
## 安装
`npm install @terwanerik/scrolltrigger` or just add the `dist/ScrollTrigger.min.js` file to your project and import that.  
`npm install @terwanerik/scrolltrigger` 或者添加这个 `dist/ScrollTrigger.min.js` 文件到你的工程并且引入它。

## How to use?
## 如何使用
The easiest way to start is to create a new instance and add some triggers to it, with all default values. This will toggle the 'visible' class when the element comes into the viewport, and toggles the 'invisible' class when it scrolls out of the viewport.  
最简单开始的方式是创建一个新的实例和添加一些触发器，并使用所有的默认值。当这个元素进入视口时，将会切换可见性这个class类名，并且，当滚动出视口时也会切换 invisible 这个类名。

```javascript
// when using ES6 import / npm
// 当使用ES6 import / npm
import ScrollTrigger from '@terwanerik/scrolltrigger'
// Create a new ScrollTrigger instance with default options
// 创建一个新的 ScrollTrigger 实例并使用默认选项
const trigger = new ScrollTrigger() // When not using npm, create a new instance with 'new ScrollTrigger.default()'
const trigger = new ScrollTrigger() // 如果没有使用npm，创建一个实例可以 new ScrollTrigger.default()
// Add all html elements with attribute data-trigger
// 添加所有的叫 data-trigger 属性的 html 元素
trigger.add('[data-trigger]')
```

Now in your CSS add the following classes, this fades the `[data-trigger]` elements in and out.  
现在添加可以选中这些元素的选择器，并定义这些元素的淡入和淡出


```css
.visible, .invisible {
  opacity: 0.0;
  transition: opacity 0.5s ease;
}
.visible {
  opacity: 1.0;
}
```

> ⚠️ **Attention**
> Are you migrating from 0.x to 1.x? [Checkout the migration guide!](https://github.com/terwanerik/ScrollTrigger#migrating-from-0x-to-1x)

> ⚠️ **注意**
> 你是不是正在从 0.x 迁移到 1.x? [查看这个迁移引导!](https://github.com/terwanerik/ScrollTrigger#migrating-from-0x-to-1x)

### Some more demo's
 - [A Vue.js example with image lazy loading](https://codepen.io/erikterwan/pen/bGNeRMr)
 - [A Vue.js example with infinite scroll](https://codepen.io/erikterwan/pen/QWwEMdZ)

 ### 还有一些demo
 - [一个 Vue.js 的图片懒加载示例](https://codepen.io/erikterwan/pen/bGNeRMr)
 - [一个 Vue.js 的无限滚动的示例](https://codepen.io/erikterwan/pen/QWwEMdZ)

## A more detailed example
## 一个更详细的示例
Adding callbacks / different classes can be done globally, this becomes the default for all triggers you add, or you can specify custom configuration when adding a trigger.  
添加回调/不同的类名可以全局完成，这将成为您添加的所有触发器的默认配置，或者您可以在添加触发器时自定义配置。


```javascript
// Create a new ScrollTrigger instance with some custom options
// 使用一些自定义选项创建一个新的 ScrollTrigger 实例
const trigger = new ScrollTrigger({
  trigger: {
    once: true
  }
})
// Add all html elements with attribute data-trigger, these elements will only be triggered once
// 添加所有的叫 data-trigger 属性的 html 元素，这些元素将会仅一次被触发
trigger.add('[data-trigger]')
// Add all html elements with attribute data-triggerAlways, these elements will always be triggered
// 添加所有叫 data-triggerAlways 属性的 html 元素，这些元素将会被每次触发
trigger.add('[data-triggerAlways]', { once: false })
```

## Options
## 选项
The full set of options is taken from the `demo` directory, for more info, check that out.  
该完整的选项集合来自 `demo` 目录，更多信息，请查看。

```javascript
const trigger = new ScrollTrigger({
    // Set custom (default) options for the triggers, these can be overwritten
    // 为触发器设置自定义（默认）选项，这些可以被覆盖
    // when adding new triggers to the ScrollTrigger instance. If you pass
    // 当添加新的触发器到 ScrollTrigger 实例。如果在添加新触发器时传递选项
    // options when adding new triggers, you'll only need to pass the object
    // 你只需要传触发器对象
    // `trigger`, e.g. { once: false }
    // 例如 选项是 { once: false }
    trigger: {
        // If the trigger should just work one time
        // 如果该触发器应该只执行一次
        once: false,
        offset: {
            // Set an offset based on the elements position, returning an
            // integer = offset in px, float = offset in percentage of either
            // 根据元素位置设置偏移量，返回 integer=像素偏移量 返回 float = 偏移量百分比
            // width (when setting the x offset) or height (when setting y)
            // 宽度 （当设置x偏移量时） 高度 （当设置y偏移量时）
            // So setting an yOffset of 0.2 means 20% of the elements height,
            // the callback / class will be toggled when the element is 20%
            // in the viewport.
            // 因此设置 0.2 的 yOffset 表示高度的20%，当元素在视口中为20%时， 该回调/类名将会切换。 
            element: {
                x: 0,
                y: (trigger, rect, direction) => {
                    // You can add custom offsets according to callbacks, you
                    // get passed the trigger, rect (DOMRect) and the scroll
                    // direction, a string of either top, left, right or
                    // bottom.
                    // 您可以根据回调添加自定义偏移量，您可以通过触发器、矩形 (DOMRect) 和滚动方向、top、left、right或bottom的字符串。
                    return 0.2
                }
            },
            // Setting an offset of 0.2 on the viewport means the trigger
            // will be called when the element is 20% in the viewport. So if
            // your screen is 1200x600px, the trigger will be called when the
            // user has scrolled for 120px.
            // 在视口上设置偏移量 0.2 意味着当元素在视口中占 20% 时将调用触发器。 因此，如果您的屏幕为 1200x600px，当用户滚动 120px 时将调用触发器。
            viewport: {
                x: 0,
                y: (trigger, frame, direction) => {
                    // We check if the trigger is visible, if so, the offset
                    // on the viewport is 0, otherwise it's 20% of the height
                    // of the viewport. This causes the triggers to animate
                    // 'on screen' when the element is in the viewport, but
                    // don't trigger the 'out' class until the element is out
                    // of the viewport.
                    // 我们检查触发器是否可见，如果是，则视口上的偏移量为 0，否则为视口高度的 20%。 当元素在视口中时，这会导致触发器在“on screen”设置动画，但在元素离开视口之前不要触发“out”类名。
                    // This is the same as returning Math.ceil(0.2 * frame.h)
                    // 这和返回 Math.ceil(0.2 * frame.h) 是一样的
                    return trigger.visible ? 0 : 0.2
                }
            }
        },
        toggle: {
            // The class(es) that should be toggled
            // 这个class会被切换
            class: {
                in: 'visible', // Either a string, or an array of strings
                in: 'visible', // 均是字符串类型 或 字符串类型的数组
                out: ['invisible', 'extraClassToToggleWhenHidden']
            },
            callback: {
                // A callback when the element is going in the viewport, you can
                // return a Promise here, the trigger will not be called until
                // the promise resolves.
                // 当一个元素即将出现在视口时的回调，你可以在这里返回一个Promise ,直到这个Promise 为 resolve 时才会调用触发器
                in: null,
                // A callback when the element is visible on screen, keeps
                // on triggering for as long as 'sustain' is set
                // 当元素在屏幕上可见时的回调，只要设置了 'sustain' 就会一直触发
                visible: null,
                // A callback when the element is going out of the viewport.
                // You can also return a promise here, like in the 'in' callback.
                // 当元素离开视口时的回调。 你也可以在这里返回一个 promise，就像在 'in' 回调中一样。
                // Here an example where all triggers take 10ms to trigger
                // the 'out' class.
                // 这是一个示例，其中所有触发器都需要 10 毫秒来触发“out”类。
                out: (trigger) => {
                    // `trigger` contains the Trigger object that goes out
                    // of the viewport
                    // `trigger` 包含离开视口的 Trigger 对象
                    return new Promise((resolve, reject) => {
                        setTimeout(resolve, 10)
                    })
                }
            }
        },
    },
    // Set custom options and callbacks for the ScrollAnimationLoop
    // 为 ScrollAnimationLoop 设置自定义选项和回调 
    scroll: {
        // The amount of ms the scroll loop should keep triggering after the
        // scrolling has stopped. This is sometimes nice for canvas
        // animations.
        // 滚动停止后滚动循环应保持触发的毫秒数。 这有时对 canvas 动画很好。
        sustain: 200,
        // Window|HTMLDocument|HTMLElement to check for scroll events
        // Window|HTMLDocument|HTMLElement 检查哪个元素的滚动事件
        element: window,
        // Add a callback when the user has scrolled, keeps on triggering for
        // as long as the sustain is set to do
        // 这个回调会在用户滚动时一直触发
        callback: didScroll,
        // Callback when the user started scrolling
        // 当用户开始滚动时触发
        start: () => {},
        // Callback when the user stopped scrolling
        // 当用户结束滚动时触发
        stop: () => {},
        // Callback when the user changes direction in scrolling
        // 当用户改变滚动方向时触发
        directionChange: () => {}
    }
})

/***
 ** Methods on the ScrollTrigger instance
 ***/

/**
 * Creates a Trigger object from a given element and optional option set
 * 从给定元素和选项创建一个触发器
 * @param {HTMLElement} element
 * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
 * @returns Trigger
 */
trigger.createTrigger(element, options)

/**
 * Creates an array of triggers
 * 创建一个数组的触发器
 * @param {HTMLElement[]|NodeList} elements
 * @param {Object} [options=null] options
 * @returns {Trigger[]} Array of triggers
 */
trigger.createTriggers(elements, options)

/**
 * Adds triggers
 * 添加一个触发器
 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
 * @param {Object} [options=null] options
 * @returns {ScrollTrigger}
 */
trigger.add(objects, options)

/**
 * Removes triggers
 * 删除触发器
 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
 * @returns {ScrollTrigger}
 */
trigger.remove(objects)

/**
 * Lookup one or multiple triggers by a query string
 * 通过选择器查找一个或多个触发器
 * @param {string} selector
 * @returns {Trigger[]}
 */
trigger.query(selector)

/**
 * Lookup one or multiple triggers by a certain HTMLElement or NodeList
 * 通过准确的元素或元素列表查找一个或多个触发器
 * @param {HTMLElement|HTMLElement[]|NodeList} element
 * @returns {Trigger|Trigger[]|null}
 */
trigger.search(element)

/**
 * Reattaches the scroll listener
 * 重新监听滚动
 */
trigger.listen()

/**
 * Kills the scroll listener
 * 杀死滚动监听
 */
trigger.kill()


/***
 ** Methods on a Trigger instance, e.g. when receiving from a callback or from a query
 ***/
const receivedTrigger = new Trigger()

/**
 * The HTML element
 */
receivedTrigger.element

/**
 * The offset settings
 */
receivedTrigger.offset

/**
 * The toggle settings
 */
receivedTrigger.toggle

/**
 * If the trigger should fire once, boolean
 */
receivedTrigger.once

/**
 * If the trigger is visible, boolean
 */
receivedTrigger.visible
```

## Migrating from 0.x to 1.x
The main differences between `0.x` and `1.x` are the way you add and configure your
triggers. `0.x` added all HTMLElement's with the data-scroll attribute by default,
`1.x` doesn't do that, this requires you to add the triggers yourself. This improves
the configuration of the triggers.

Also, please note that when *not* using a package manager / webpack, and you're
just importing the minified version, you'll have to always use `new ScrollTrigger.default()`.

```html
<script src="dist/ScrollTrigger.min.js"></script>
<script>
var trigger = new ScrollTrigger.default()
</script>
```

Take for example the following element in ScrollTrigger `0.x`:

```html
<div data-scroll="once addHeight" data-scroll-showCallback="alert('Visible')" data-scroll-hideCallback="alert('Invisible')"></div>
```

In ScrollTrigger `1.x` you would write this mostly in JavaScript:

```javascript
// Say you have some divs with class 'animateMe'
const scrollTrigger = new ScrollTrigger()
scrollTrigger.add('.animateMe', {
    once: true, // same functionality as the `once` flag in v0.x
    offset: {
        element: {
            y: 1.0 // note that we pass a float instead of an integer, when the
                   // offset is a float, it takes it as a percentage, in this
                   // case, add 100% of the height of the element, the same
                   // functionality as the `addHeight` flag in v0.x
        }
    },
    toggle: {
        callback: {
            in: () => { // same as the data-scroll-showCallback, no need to set a
                        // custom callScope when calling custom functions and
                        // the possibility to return a Promise
                alert('Visible')
            },
            out: () => { // same as the data-scroll-hideCallback
                alert('Invisible')
            }
        }
    }
})
```

The advantage of writing all this in javascript is the configuration possible, say
i want to change the offset of the element after the first time it's been visible
(e.g. remove the `addHeight` flag after it's been shown):

```javascript
scrollTrigger.add('.animateMe', {
    offset: {
        element: {
            y: 1.0
        }
    },
    toggle: {
        callback: {
            in: (trigger) => {
                // remove the element offset
                trigger.offset.element.y = 0
            }
        }
    }
})
```

Another example for setting custom classes per toggle;

```html
<div data-scroll="toggle(animateIn, animateOut)"></div>
```

Becomes

```javascript
const scrollTrigger = new ScrollTrigger()

scrollTrigger.add('[data-scroll]', {
    toggle: {
        class: {
            in: 'animateIn',
            out: 'animateOut'
        }
    }
})
```

If you have any questions on migrating to `v1.x` feel free to [create a new issue](https://github.com/terwanerik/ScrollTrigger/issues).

## Contributing
Fork, have a look in the `src/` directory and enjoy! If you have improvements, start a new branch & create a pull request when you're all done :)

## Troubleshooting
You can see really quickly if the Trigger is working by hitting 'inspect element'. Here you can see if the visible/invisble class is toggled when you scroll past the element.

If the classes don't toggle, check the JavaScript console. There might be some handy info in there.

#### Found an issue?
Ooh snap, well, bugs happen. Please create a new issue and mention the OS and browser (including version) that the issue is occurring on. If you are really kind, make a [minimal, complete and verifiable example](http://stackoverflow.com/help/mcve) and upload that to [codepen](http://codepen.io).

## Legacy
Looking for the old ScrollTrigger? Check out the [legacy branch](https://github.com/terwanerik/ScrollTrigger/tree/legacy-v0.3.6)!
