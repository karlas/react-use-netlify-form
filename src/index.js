import React, { useRef } from 'react'

export default (fields, formName) => {
  const wrapRef = useRef()
  const dummyFrame = 'useNetlifyForm_iframe_' + formName
  const iframeHTML = `<iframe name="${ dummyFrame }" id="${ dummyFrame }"></iframe>`
  const hiddenForm = (
    <div ref={ wrapRef } style={{ display : 'none' }}>
      <form name={ formName } netlify="true" target={ dummyFrame }>
        { fields.map(field => <input key={ field } name={ field } type="hidden" />) }
        <input type="hidden" name="form-name" value={ formName } />
      </form>
      <div dangerouslySetInnerHTML={{ __html : iframeHTML }} />
    </div>
  )
  const submit = data => new Promise((resolve, reject) => {
    const wrap = wrapRef.current
    const form = wrap.querySelector('form')
    const iframe = wrap.querySelector('iframe')
    const iframeLoadHandler = () => {
      const success = iframe.contentDocument.body.innerHTML.includes('Your form submission has been received')
      iframe.removeEventListener('load', iframeLoadHandler)
      iframe.contentDocument.body.innerHTML = ''
      success ? resolve(true) : reject(false)
    }
    fields.forEach(field => {
      form.querySelector(`[name=${ field }]`).value = data[ field ].toString()
    })
    iframe.addEventListener('load', iframeLoadHandler)
    form.submit()
  })
  return { hiddenForm, submit }
}
