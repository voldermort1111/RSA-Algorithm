const text = {}

text.wordToNumber = function (word){    //số đc chuyển mỗi word
    let number = 0 
    for(let i=0; i<word.length; i++){ 
        let keyNumber = word.toUpperCase().charCodeAt(i)-64
        number += keyNumber*(Math.pow(27,word.length-i-1))
    }
    return(number) // trả về số của mỗi word
}

text.textToNumbers = function (textInput){   //mảng số được chuyển từ mỗi word
    let numbers = []
    let words = textInput.split(" "); // mảng word
    for(let i=0; i<words.length; i++){
        let number = text.wordToNumber(words[i])
        numbers.push(number)
    }
    return numbers //trả về mảng số
}
