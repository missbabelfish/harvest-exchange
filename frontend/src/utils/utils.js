export  function FormToJson(formData)
{
    var object = {};
//    formData.forEach((value, key) => object[key] = value);
    for(var i =0; i < formData.length; ++i)
    {
        const key = formData[i].name;
        const value = formData[i].value;
//        console.log(`Object[${key}] = '${value}'`);
        if (key && value)
            object[key] = value;
    }
    //var json = JSON.stringify(object);
    //return json;    

    return object;
}