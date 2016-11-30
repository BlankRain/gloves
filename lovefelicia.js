;(function(){
	

var KBS=[]; // keyboard key set
var GLS=[]; // gloves key set  

/**
初始化
**/
function init(){
	//data init 
	for(var i=0;i<200;i++){
		KBS.push('KB'+i);
	}
	for(var i=0;i<44;i++){
		GLS.push('GL'+i);
	}
	// function init 
	;Array.prototype.distinct=function(){
		var r=[],f=[];//result and flag 
		for(var e in this){
			if(this[e]===[][e]) continue; //just jump prototype
			if(f[this[e]]!=true){ //check flag 
				r.push(this[e]);
				f[this[e]]=true;// set flag 
			}
		}
		return r;
	}
	;Array.prototype.partion=function(keyfunc){
		var _a=this;
		var r=[];
		var keys=_a.map(keyfunc).distinct();
		for(var i in keys){
			var k=keys[i];
			if(k===[][i]) continue; //just jump prototype
			var v=_a.filter(function(e){
				return keyfunc(e)==k;
			})
			r.push( {'K':k,'V':v});
		}
		return r;
	}
	;Array.prototype.zip=function(col){
		var _a=this,r=[];
		var l=_a.length>col.length? col.length:_a.length;
		for(var i=0;i<l;i++){
			r.push([_a[i],col[i]]);
		}
		return r;
	}
	;Array.prototype.zipWithNil=function(col){
		var _a=this,r=[];
		var l=_a.length<col.length? col.length:_a.length;
		for(var i=0;i<l;i++){
			r.push([_a[i],col[i]]);
		}
		return r;
	}
	
}
/**
类别字典
**/
whatIsMyCatalog(key){
	var kcmap={'':''};//need build data
	return kcmap[key];
}
/**
给键盘分类(监督,根据数据打分分类)
分五类，五个等级
*/
function catalogKS(whichKeySet){
	var cvs=whichKeySet.map(function(e,i,col){
		var c=whatIsMyCatalog(e);
		return {'catalog':c,'key':e};
	});
	
	return cvs.partion(function(e){
			return e['catalog'];
		});
}
/**
键不够，就去借.
借用算法~
**/
function letsBorrown(needBorrown,e,i,col){
	
}
var catalogKBS=catalogKS(KBS);// 键盘区域分类
var catalogGLS=catalogKS(GLS);// 手套区域分类

//s1 =(fc1)>> sc1  <<=(g)=>> sc2 <<(fc2)= s2
var g=catalogKBS.zip(catalogGLS);

g.map(function(e,i,col){
	//e [eOfCatalogKBS {K,V},eOfCatalogGLS{K,V}]
	var l=e[0],r=e[1];
	var lk=l['K'],rk=r['K'];
	var lv=l['V'],rv=r['V'];
	var z=lv.zipWithNil(rv);
	var needBorrown=z.filter(function(e){
		return (e[0]==undefined||e[1]==undefined);
	});
	var doNotneedBorrown=z.filter(function(e){
		return !(e[0]==undefined||e[1]==undefined);
	});	
	var borrowned=letsBorrown(needBorrown,e,i,col);
	return doNotneedBorrown.concat(borrowned);
});// build mapping...


}
)()
