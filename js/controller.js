const controller = {}

controller.initAuth = function () {

    
}


encryption = function () {
    let encode_decode = 0
    let textInput = document.getElementById('input-text').value
    let nInput = document.getElementById('input-n').value
    let eInput = document.getElementById('input-e').value
    let p = 223
    let q = 227
    let e = 5
    let N = p * q
    let M = (p - 1) * (q - 1)

    // mã hóa xâu ký tự sang hệ số 10
    let numbers = text.textToNumbers(textInput)    //mã hóa xâu ký tự sang hệ số 10, mảng số
    console.log("Text input: " + textInput)
    console.log("Number Array:\n" + numbers)

    //Tạo khóa công khai e
    if (nInput) {

        N = Number(nInput)
        p = number.productOfPrime(N) // phân tích p là 1 thừa số nguyên tố của N
        q = N / p
        M = (p - 1) * (q - 1)
        console.log('N = ' + N)
        console.log('p = ' + p)
        console.log('q = ' + q)
        console.log('m = ' + M)

        //
        if (eInput > 1 && eInput < M && number.gcd(M, eInput) == 1) { //nếu input e k đủ điều kiện thì sẽ tính e
            e = eInput
            console.log('e = ' + e);
        } else {
            for (let i = 2; i < M; i++) {   // Tìm e : gcd (e,M) = 1
                if (number.gcd(M, i) == 1) {
                    e = i //
                    document.getElementById('input-e').value = e
                    console.log('e = ' + e);
                    break;
                }
            }
        }

    }

    //Mã hóa các số trong numbers[]   cipherNumbers[] = numbers[i]**e mod (N)
    let cipherNumbers = number.powModNumbers(numbers, e, N, encode_decode)
    console.log(cipherNumbers);
    

    //Đổi các số hệ số 10 sang dãy các ký tự được mã hóa
    let cipherText = number.numbersToText(cipherNumbers)
    document.getElementById('input-result').value = cipherText

    //
    
}
decryption = function () {
    let encode_decode =1
    let textInput = document.getElementById('input-text').value
    let nInput = document.getElementById('input-n').value
    let eInput = document.getElementById('input-e').value
    let N, e, p, q, M,d

    //Chuyển xâu ký tự bản mã sang hệ số 10
    let numbers = text.textToNumbers(textInput)    //mã hóa xâu ký tự sang hệ số 10, mảng số
    console.log("Text input: " + textInput)
    console.log("Number Array:\n" + numbers)

    //Phân tích N thành p,q . Tính phi của N
    N = Number(nInput)
    p = number.productOfPrime(N) // Phân tích N thành p,q
    q = N / p
    M = (q - 1) * (p - 1)
    e = eInput
    console.log('N = ' + N)
    console.log('p = ' + p)
    console.log('q = ' + q)
    console.log('M = ' + M)
    console.log('e = ' + e)

    //Tìm khóa bí mật d   
    d = number.euclid(M, e)
    console.log('d = ' + d);

    //Giải mã các số trong numbers[]   
    let cipherNumbers = number.powModNumbers(numbers, d, N, encode_decode)
    
    //Đổi các số hệ số 10 sang dãy các ký tự bản rõ
    let cipherText = number.numbersToText(cipherNumbers)
    document.getElementById('input-result').value = cipherText

}


