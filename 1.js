const r = [{
    key:1

},{
    key:2
},{
    key:3
}]
	let res = [];
	
	r.forEach(ele => {
		if (ele.key !== 1){
			res.push(ele);
		}
	});


console.log(res);
