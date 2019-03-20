export default {
  selectCols(name){//选择列表时
        if(!this.checked[name]){//checkbox未选中，要选择时
           this.checked[name] = true;//将checkbox选中
           if(!this.isarray(name,this.curTableData))//如果不存在，push
              this.curTableData.push(name);
        }else{//checkbox已选中，取消选择时
          this.checked[name] = false;//将checkbox取消选中
          if(this.isarray(name,this.curTableData)){//如果存在，删除
            this.curTableData.forEach((item,index)=>{
              if(item == name){
                this.curTableData.splice(index,1);
              }
            });
          }
        }
  },
}