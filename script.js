const pokemonName=document.querySelector('.pokemon_name');



const pokemonId=document.querySelector('.pokemon_number')


const pokemon_image=document.querySelector('.pokemon')

const form = document.querySelector('.form ')

const input = document.querySelector('.search_pokemon')

const button_prev = document.querySelector('.prev-button')

const button_next = document.querySelector('.next-button')

const info_button = document.querySelector('.info-button')

const dados =document.querySelector('.ativo')

const type_status = document.querySelector('.type_status')

const exit =document.querySelector('.exit')

const hp_status = document.querySelector('.hp_status')

const defense = document.querySelector('.defense_status')

const special_attack = document.querySelector('.special_attack')

const attack = document.querySelector('.attack')


let search = 1


const get_pokemon_api = async (pokemon) =>{
    const fetch_api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}
    `
    )

    console.log(fetch_api)

    if (fetch_api.status == 200){
        const data = await fetch_api.json()
    
        return data


}
}


const show_pokemon = async (pokemon) =>{
    const data = await get_pokemon_api(pokemon);
    pokemonName.innerHTML = 'Loading...'

    if (data) {
        pokemon_image.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id + ' -'
        search = data.id
        pokemon_image.src= await data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value=''
        type_status.innerHTML = 'Type : '+data['types']['0']['type']['name']
        hp_status.innerHTML = 'Hp :' + data['stats']['0']['base_stat']
        attack.innerHTML = 'Attack : '+ data['stats']['1']['base_stat']
        defense.innerHTML = 'Defense : ' + data['stats']['2']['base_stat']
        special_attack.innerHTML = 'Special Attack: ' +  data['stats']['3']['base_stat']
 
    }
    else{
        pokemon_image.style.display = 'none'
        pokemonName.innerHTML= 'not found'
        pokemonId.innerHTML = ''
    }
    }



form.addEventListener('submit',(event) =>{
    event.preventDefault()
    
    show_pokemon(input.value.toLowerCase())
})

button_prev.addEventListener('click',() =>{
    if (search > 1){
    search-=1
    show_pokemon(search)
    }
    
  
})
button_next.addEventListener('click',() =>{
   
        search+= 1
        show_pokemon(search)


})

info_button.addEventListener('click',() =>{
    dados.style.visibility = 'visible'
    input.style.visibility = 'hidden'
    button_prev.style.visibility = 'hidden'
    button_next.style.visibility = 'hidden'
    info_button.style.visibility = 'hidden'
    exit.style.visibility = 'visible'
  
})

exit.addEventListener('click', 
() =>{
    input.style.visibility = 'visible'
    button_prev.style.visibility = 'visible'
    button_next.style.visibility = 'visible'
    info_button.style.visibility = 'visible'
    exit.style.visibility = 'hidden'
    dados.style.visibility = 'hidden'
})



show_pokemon(search)