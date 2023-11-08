// Part 1


function numInfo(num){
    return axios.get(`http://numbersapi.com/${num}?json`)
        .then(data=> console.log(data.data))
        .catch(err=> console.log(err))
}

for (let i = 1; i <= 5 ; i++){
    let num = Math.floor(Math.random()*100)
    numInfo(num)
}

function getFourFacts(num){
        return new Promise((resolve, reject)=>{
            for (let i=1; i<=4; i++){
            axios.get(`http://numbersapi.com/${num}?json`)
            .then(data=> console.log(data.data.text))
            .catch(err=> console.log(err))
            }
    })
    
}

// jQuery

Promise.all(
    Array.from({ length:4 }, () => {
        return $.getJSON(`http://numbersapi.com/4?json`)
    })
).then(info=> {
    console.log(info)
  info.forEach(data => $("body").append(`<p>${data.text}</p>`));

})


// AXIOS 

let facts=[]
for(let i=1; i<5; i++){
    facts.push(
        axios.get('http://numbersapi.com/14?json')
    )
}

Promise.all(facts).then(arr => {
    console.log(arr)
    arr.forEach(data => $("body").append(`<p>${data.data.text}</p>`))
})

// Part 2 


function shuffleAndDealOne(){
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res=>res.data.deck_id)
    .then(id=> axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`))
    .then(data=>{
        console.log(`${data.data.cards[0].value} OF ${data.data.cards[0].suit}`)
    })
}

function shuffleAndDealTwo(){
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res=>res.data.deck_id)
    .then(id=> axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`))
    .then(data=>{
        console.log(`${data.data.cards[0].value} OF ${data.data.cards[0].suit}, ${data.data.cards[1].value} OF ${data.data.cards[1].suit}` )
    })
}

let url;

axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
.then(res=>res.data.deck_id)
.then(id=> {
    url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`
    console.log(url)
})

let card;

$("#get-card").on('click', function (){
    card_info = $.getJSON(url)
    .then(card_info => {
        console.log(card_info)
        $(".container").html(`
            <div class="card mx-auto mt-5">
                <img class="card-img img-fluid" src="${card_info.cards[0].image}">
            </div>
        `)
    })
})
