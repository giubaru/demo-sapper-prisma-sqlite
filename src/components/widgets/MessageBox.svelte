<script>
  // export let color = 'blue';
  export let message;
  export {className as class};
  let className;
  // $: alertStyle = function getStatusClass() {
  //   let alertClass;
  //   if (status === 'success'){
  //     alertClass = 'alert-success';
  //   } else if (status === 'danger'){
  //     alertClass = 'alert-danger';
  //   } else if (status === 'warning'){
  //     alertClass = 'alert-warning';
  //   } else if (status === 'info'){
  //     alertClass = 'alert-info';
  //   } else {
  //     alertClass = 'alert-info';
  //   }
  //   return alertClass
  // }
</script>

<div class="alert {className}">
  {message}
</div>

