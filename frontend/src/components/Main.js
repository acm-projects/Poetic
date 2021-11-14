import React, {useContext, useEffect, useState} from 'react'


let i = 0;

const Main = (props) =>  {
                
    function getRandomPoem() {

        console.log(props.poems)
        console.log(i);
        let index = i
        index = index % 3;
        console.log(index)
        i++
        return props.poems[index];
    }
    
    function printPoem() {
    
        const poem = getRandomPoem();
    
        if(poem)

        return (
                <div class="bg-white rounded shadow py-2">
                <p class="text-gray-800 text-base px-6 mb-5 hover:text-pink-500">{(poem.body).substr(0, 150) + "..."}</p>
                <p class="text-gray-500 text-xs md:text-sm px-6">{poem.authors[1] ? poem.authors[0] + ", " + poem.authors[1] : poem.authors[0]}</p>
                </div>
        ) 
        else
        console.log('poem not found')
    }


    return (
    <div>
        <main class="h-flex flex items-center bg-gray-100">
        <div className="self-start flex flex-col gap-4 p-6 font-bold text-8xl flex-1">
        <div className="p-4 font-normal text-6xl mb-3">
            Welcome to Poetic
        </div>
        <div className="text-center text-left text-4xl font-light mb-3">
            &emsp; A webpage designed to allow collaboration between poets of all skill levels, regardless of location
        </div>
    </div>
    </main>

    <section class="bg-pink-100">
  <div class="container mx-auto px-6 py-20">
    <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">
      User's Poems
    </h2>
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/3 px-2 mb-4">
            {printPoem()}
      </div>
      <div class="w-full md:w-1/3 px-2 mb-4">
            {printPoem()}
      </div>
      <div class="w-full md:w-1/3 px-2 mb-4">
            {printPoem()}
      </div>
    </div>
  </div>
</section>
    </div>
        );
}

export default Main;