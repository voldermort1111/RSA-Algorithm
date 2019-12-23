const number = {}

//trả về mảng số được mã hóa
number.powModNumbers = function (numbers, e, N, encode_decode) {
    let cypherNumbers = []

    for (let i = 0; i < numbers.length; i++) {

        let cypherNumber = number.powModNumber(numbers[i], e, N, encode_decode)
        console.log('cipher: ' + cypherNumber);

        cypherNumbers.push(cypherNumber)
    }

    return cypherNumbers
}

//powModNumber
number.powModNumber = function (dec, e, N, encode_decode) {
    let result = 5

    //Tính số bits tối đa có thể mã hóa đc
    let bits = Math.floor(Math.log(N) / Math.log(2))
    console.log('max bit = ' + bits);

    //check binary
    let binary = number.toBinary(dec)
    let maxPart = Math.ceil(binary.length / bits); // số đoạn tối đa phải chia
    console.log('max part: ' + maxPart);

    console.log('input binary: ' + binary);
    if (2 ** (binary.length) <= N) {
        
        result = number.powMod2(dec, e, N)
        console.log(result);
        
    } else {  //Nếu độ dài bản mã dài quá N, phải cắt thành các đoạn
        console.log('binary length: ' + binary.length);

        // xẻ chuỗi --> parts[]
        console.log(binary.split(""));
        let parts = []
        if (encode_decode == 0) {
            let thieu = bits - (binary.length)%(bits)
            
            if((binary.length)%(bits)!= 0){
                for(let i=0; i< thieu; i++){
                    binary = '0'+binary
                }
            }

            for (let i = 0; i < maxPart; i++) {
                parts.push(binary.slice(i * bits, bits + i * bits))
            }            
        }
        if (encode_decode == 1) {
            maxPart = Math.ceil(binary.length / (bits+1))
            
            let thieu = Number(bits) + 1 -( (binary.length)%(bits+1))

            if((binary.length)%(bits+1) != 0){
                for(let i=0; i< thieu; i++){
                    binary = '0'+binary
                }
            }
            for (let i = 0; i < maxPart; i++) {
                parts.push(binary.slice(i * (bits + 1), bits + 1 + i * (bits + 1)))
            }
        }

        console.log(parts);

        //chuyển các đoạn binary sang decima, tính pow mod, chuyển lại từ decima sang binary
        for (let i = 0; i < parts.length; i++) {

            let dec = number.toDecima(parts[i])

            let tmp = number.powMod2(dec, e, N)

            parts[i] = number.toBinary(tmp)
        }
        console.log(parts);


        //check parts[] xem đủ độ dài bits k
        for (let i = 0; i < parts.length; i++) {
            if (encode_decode == 0) {
                if (parts[i].length < bits + 1) {
                    let k = bits+1 - parts[i].length
                    for (let j = 0; j < k; j++) {
                        parts[i] = '0' + parts[i]
                    }
                }
            }
            if (parts[i].length < bits) {
                    let k = bits - parts[i].length
                                       
                    for (let j = 0; j < k; j++) {
                        parts[i] = '0' + parts[i]
                    }
                console.log(parts[i]);
                console.log(parts);
            }
        }

        //merge Binary
        let listBinary = ''
        for (let i = 0; i < parts.length; i++) {
            listBinary += parts[i]
        }
        console.log(listBinary);

        result = number.toDecima(listBinary)
        // result = number.powMod2(dec, e, N)
    }

    return Number(result)
}


//trả về số đồng dư lũy thừa
number.powMod = function (base, exp, mod) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        return this.powMod(base, (exp / 2), mod) ** 2 % mod;
    }
    else {
        return (base * this.powMod(base, (exp - 1), mod)) % mod;
    }
}
//
number.powMod2 = function (base, e, N) { // Tính C = M^e (mod N)
    let binarys = []
    let z = 1
    binarys = number.toBinary(e) //chuyển về nhị phân

    for (let i = 0; i < binarys.length; i++) {
        if (binarys[i] == 1) {
            z = (z * z) * base
            z = z - (Math.floor(z / N)) * N
        } else {
            z = (z * z)
            z = z - (Math.floor(z / N)) * N
        }
    }
    return z
}

//Chuyển nhị phân về thập phân
number.toDecima = function (bin) {
    let result = 0
    console.log(bin);
    
    for (let i = 0; i < bin.length; i++) {
        if (bin.charAt(i) == 1) {
            result += 2 ** (bin.length - 1 - i)
        }
    }

    return result
}

//Chuyển về nhị phân
number.toBinary = function (number) {
    let i
    let tmp = number
    for (i = 0; ; i++) {
        tmp = tmp / 2
        if (tmp < 1) {
            break;
        }
    }
    let indexs = ""
    for (let j = i; j >= 0; j--) {
        index = Math.floor(number / (2 ** j))
        indexs += index
        number = number - index * (2 ** j)
    }
    return indexs
}

//
number.numbersToText = function (numbers) {
    let text = ""
    for (let i = 0; i < numbers.length; i++) {
        let word = number.numberToWord(numbers[i])
        if (i == numbers.length - 1) {
            text += word
            return text
        }
        text += word + " "

    }

    return text
}

number.numberToWord = function (bigNumber) {
    let i
    let tmp = bigNumber
    //tính max ký tự
    for (i = 0; ; i++) {
        tmp = tmp / 27
        if (tmp < 1) {
            break;
        }
    }

    //Mảng keyNumber để chuyển từ số về ký tự
    let indexs = []
    for (let j = i; j >= 0; j--) {
        index = Math.floor(bigNumber / (27 ** j))
        indexs.push(index)
        bigNumber = bigNumber - index * (27 ** j)
    }

    //trả về 1 word
    let word = ''
    for (let i = 0; i < indexs.length; i++) {
        let char = String.fromCharCode(indexs[i] + 64)
        word += char
    }
    return word;

}

//phân tích 2 thừa số 
number.productOfPrime = function (N) {
    for (let i = 2; i <= N / 2; i++) {
        if (N % i == 0) {
            return i
        }
    }
}

//tìm đồng dư
number.gcd = function (M, i) {
    if (!i) {
        return M;
    }
    return this.gcd(i, M % i);
}

//tìm d áp dụng thuật toán euclid mở rộng
number.euclid = function (m, e) {
    let xa = 1, ya = 0, xb = 0, yb = 1, temp = m

    while (m != 0) {
        let z = Math.floor(e / m)
        let r = e % m
        e = m;
        m = r;
        let xr = xa - z * xb
        let yr = ya - z * yb
        xa = xb;
        ya = yb;
        xb = xr;
        yb = yr;
    }

    if (xa < 0) {
        xa = xa + temp
    }

    return xa
}
