<template>
<div id="form">
    
    <form v-on:submit.prevent="post">
    <div class="row">
      <div class="col-25">
        <label for="fname">Titiol:</label>
      </div>
      <div class="col-75">
        <input type="text" id="title" name="title" placeholder="Masterpice title.." v-model="form.title">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Autor:</label>
      </div>
      <div class="col-75">
        <input type="text" id="author" name="author" placeholder="Author Name.." v-model="form.author">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Type:</label>
      </div>
      <div class="col-75">
        <input type="text" id="type" name="type" placeholder="Type of the masterpiece..." v-model="form.type">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Score:</label>
      </div>
      <div class="col-75">
        <input type="text" id="score" name="score" placeholder="Type of the masterpiece..." v-model="form.score">
      </div>
    </div>
 <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Català:</label>
      </div>
    <div class="col-75">
        <textarea id="ca" name="ca" placeholder="Description in Catalan" style="height:70px" v-model="form.ca"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Castellà:</label>
      </div>
    <div class="col-75">
        <textarea id="es" name="es" placeholder="Description in Spanish" style="height:70px" v-model="form.es"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Anglès:</label>
      </div>
    <div class="col-75">
        <textarea id="en" name="en" placeholder="Description in English" style="height:70px" v-model="form.en"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Foto:</label>
      </div>
    <div class="col-75">
        <input type="file" accept="image/*" id="img" v-on:input="previewFile($event)" >
      </div>
    </div>
    <button class="submit">Crear Obra</button>
  </form><br><br>
  <div v-if="this.status.name != undefined">
    Obra creada correctament
  </div>
</div>
</template>


<script>
import { DataProvider } from "@/data-providers/_Index.js"
import { Uploader } from '@/S3Uploader.js'

export default {
    name: "AddExpo",
    data() {
        return{
            form: {
                title: '',
               author: '',
               type: '',
               score: '',
                ca: '',
                es: '',
                en: '',
                image: '',
            },
            status: [],
            image_aux: null,
        }
    },
    methods: {
        post: function(){
          if(this.image_aux!=null){
            let uploader= new Uploader();
            const data = {
              contentType: this.image_aux.type,
              fileName: this.image_aux.name,
              file: this.image_aux             
            }
            uploader.uploadImage(data, "/artworks").then((res)=>{
              this.form.image=res.Location
              console.log(this.form.image) 
            this.form.score=parseFloat(this.form.score)         
            let params = [ this.form,
                            this.$route.params.id_museu, this.$route.params.id_exposition]
            console.log(params)      
            DataProvider("MUSEUMS", "OBRA_CREATE",  params).then((res) => {
                    this.status = res;
                    if(this.status!=null){
                      this.$router.push({ name: "obres",  params: { id_museu: this.$route.params.id_museu, id_exposition: this.$route.params.id_exposition }})
                    }
                })
            })
          }
          else{
            this.form.score=parseFloat(this.form.score)         
            let params = [ this.form,
                            this.$route.params.id_museu, this.$route.params.id_exposition]
            console.log(params)      
            DataProvider("MUSEUMS", "OBRA_CREATE",  params).then((res) => {
                    this.status = res;
                    if(this.status!=null){
                      this.$router.push({ name: "obres",  params: { id_museu: this.$route.params.id_museu, id_exposition: this.$route.params.id_exposition }})
                    }
                    })
            }
          
        },
        previewFile: function(event) {
          this.image_aux= event.target.files[0];
          console.log(this.image_aux)
          
        },
    }

}
    
</script>

<style scoped>
input[type=text], select, textarea{
  width: 70%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 10px 12px 12px 0;
  display: inline-block;
}

/* Style the submit button */
.submit {
  background-color:rgb(106, 118, 171);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  float: left;
}
#form{
 margin-top: 25px;
   margin-left: 10%;

 }

/* Style the container */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}



</style>