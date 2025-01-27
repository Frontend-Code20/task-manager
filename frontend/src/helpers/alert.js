export const alertMessage = (message, type, parent) => {
  
  parent.innerHTML = '';
  const wrapper = document.createElement('div')
  
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  parent?.append(wrapper)

}