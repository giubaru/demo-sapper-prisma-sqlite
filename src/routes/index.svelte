<script context='module'>
  import MessageBox  from '../components/widgets/MessageBox.svelte';

  export function preload({params, query}){
    return this.fetch('db.json').then(r => r.json()).then(categories => {
      // console.log(categories);
      return {categories};
    });
  }
  let alertMessage = 'Este campo no puede enviarse vacio.';
  let alertType = 'alert-warning';
  let disabled = 'disabled';

</script>

<script>
  
  export let categories;
  let category = '';
  let showMessage = true;
  let alertMessage = 'Este campo no puede enviarse vacio.';
  let alertType = 'alert-warning';
  let disabled = 'disabled';

  $: if ( category === ''){
    showMessage = true;
    alertType = 'alert-warning';
    alertMessage = 'Este campo no puede enviarse vacio.';
    disabled = 'disabled'
  } else {
    showMessage = false;
    disabled = '';
  }


  function mandarCosas(){
    let data = { title: category };
    fetch('db.json', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(r => {
        r.json()
          .then(function(result) {
            // The data is posted: do something with the result...

            if (result.status.message === 'success'){
              const r = category;
              alertMessage = `Se ha insertado ${r} re piola.`;
              alertType = 'alert-success';
              categories = result.data;
              showMessage = true;
            } else if (result.status.message === 'empty-field') {
              alertMessage = `Parece que estás tratando de forzar un campo que no debe ir vacío, no seas gato...`;
              alertType = 'alert-danger';
              showMessage = true;
            } else {
              alertMessage = `Parece que pasaron cosas... mirá andá a buscar este UUID: ${result.status.uuid}`;
              alertType = 'alert-danger';
              showMessage = true;
            } 
          })
      })
  }


  let files;
  
  function uploadImage(){
    const formData = new FormData();
    formData.append('name', files[0].name);
    formData.append('dataFile', files[0]);
    // console.log(formData.dataFile);
    
    fetch('upload', {
      method: 'POST',
      body: formData
    });
  }
</script>


<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{#if showMessage}
  <MessageBox message={alertMessage} class={alertType}/>
{/if}

<div class='mb-4'>
  <input bind:value={category} type="text"/>
  <button class="btn btn-primary" on:click='{mandarCosas}' {disabled}>Añadir categoria</button>
</div>

<div class='mb-4'>
  <input id="fileUpload" type="file" bind:files={files}/>
  <button class="btn btn-danger" on:click='{uploadImage}'>Subir imagen</button>
</div>

<ul class="list-group">
  {#each categories as category}
    <li class="list-group-item">{category.title}</li>
  {/each}
</ul>
