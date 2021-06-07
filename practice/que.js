let  obj =
    {
    name: {
        first: "robin",
        last: "negi",
    },
    address: {
        city: {
        name: "Gwalior",
        },
        landmark: "Badri Marg",
        street: "22",
    },
    };

    // Output#1:
    // { 'name.first': 'robin',
    // 'name.last': 'negi',
    // 'address.city.name': 'Gwalior',
    // 'address.landmark': 'Badri Marg',
    // 'address.street': '22' }

let flatObj = {};

    function flatenObject(obj,val,flatObj)
    {

        for(key in obj)
        {
            if(typeof(obj[key])=="object")
            {
                
              val = val + key + ".";
              flatenObject(obj[key],val,flatObj);
            }
            else
            {
                
                val = val+key;
              flatObj[val] = obj[key]; 
              
            }
        }
  
    }

flatenObject(obj,"",flatObj);
console.log(flatObj);
