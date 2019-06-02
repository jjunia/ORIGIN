exports.addData =function(model,conditions,callback) {
 
    model.create(conditions, function(err,result){
        if(err) {
            console.log(err);
            callback({success:0,flag:"save data fail"});
        } else {
 
            console.log('save success');
            callback({success:1,flag:"save data success"});
        }
    });
 
}

exports.updateData =function(model,conditions,update,options,callback) {
 
    model.update(conditions, update, options, function(error,result){
        if(error) {
            console.log(error);
            callback({success:0,flag:"update data fail"});
        } else {
            if(result.n!=0){
                console.log('update success!');
                callback({success:1,flag:"update data success"});
            }
            else{
                console.log('update fail:no this data!');
                callback({success:0, flag: 'update fail:no this data!'});
            }
 
        }
    });
}

exports.removeData =function(model,conditions,callback) {
 
    model.remove(conditions, function(error,result) {
        if (error) {
            console.log(error);
            callback({success: 0, flag: "remove data fail"});
        } else {
            if(result.result.n!=0){
                console.log('remove success!');
                callback({success: 1, flag: "remove data success"});
            }
            else{
                console.log('remove fail:no this data!');
                callback({success:0, flag: 'remove fail:no this data!'});
            }
 
        }
    });
}
exports.findData =function(model,conditions,fields,options,callback) {
 
    model.find(conditions, fields, options, function(error, result){
        if(error) {
            console.log(error);
            callback({success: 0, flag: "find data fail"});
        } else {
            if(result.length!=0){
                console.log('find success!');
                callback({success: 1, flag: "find data success",result:result});
            }
            else{
                console.log('find fail:no this data!');
                callback({success: 0, flag: 'find fail:no this data!'});
            }
 
        }
 
    });
}
exports.findDataPopulation =function(model,conditions,path,fields,refmodel,options,callback) {
    model.find(conditions)
    .populate(path,fields, refmodel,options)
    .exec(function(err, result) {
            if(err) {
                console.log(err);
                callback({success: 0, flag: 'population find data fail'});
            } else {
                if(result.length!=0){
                    console.log('population find success!');
                    callback({success: 1, flag: 'population find data success',result:result});
                }
                else{
                    console.log('population find fail:no this data!');
                    callback({success: 0, flag: 'population find fail:no this data!'});
                }
 
            }
 
    });
 
}
