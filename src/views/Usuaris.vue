<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table light fixed-header>
                <table>
                    <thead>
                        <tr>
                            <th> Username </th>
                            <th>Nom usuari</th>
                            <th> Premium </th>
                            <th> Manage </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in this.users" :key="user.username">
                            <td> <router-link :to="{ name: 'InfoUser', params: { userId: user.username }}"> {{user.username}}</router-link> </td>
                            <td> {{user.fullName}} </td>
                            <td> {{user.premium}} </td>
                            <td> <button class="delete" v-on:click="esborrarUser(user.username)">  <router-link :to="{ name: 'Usuaris'}"><v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/></router-link></button><button class="delete"> <router-link :to="{ name: 'InfoUser', params: { userId: user.username }}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button> </td>
                        </tr>
                    </tbody>  
                </table>
            </v-simple-table>     
        </div>
    </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"
 

export default {
    name: "users",
    data(){
        return{
            users: [],
        }
    },
    methods: {
        obtenir_users: function(){
            DataProvider("USERS", "USERS", {}).then((res) => {
                this.users = res.users;
            })

        },
         esborrarUser:  function(id_user){
            DataProvider("USERS", "USER_DELETE", id_user).then((res) => {
                console.log(res)
            })
             this.obtenir_users();
        }
    },
    mounted() {
        this.obtenir_users();
    }
}

</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid white;
}
td {
    width: 20%;
}
th {
  border: 1px solid white;
  height: 15px;
}

</style>