var vm = new Vue({
    el: "#app",
    data: { //双向绑定
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduct: [],
    },
    filters: { //局部过滤器
        formatMoney: function(value, type) {
            return "￥" + value.toFixed(2) + type;
        }
    },
    mounted: function() { //默认调用
        this.$nextTick(function() {
            // 代码保证 this.$el 在 document 中
            this.cartView();
        })

    },
    methods: { //绑定事件
        cartView: function() { //默认事件
            var _this = this;
            this.$http.get('data/cartData.json', { "id": 123 }).then(
                function(res) {
                    _this.productList = res.data.result.list;
                    // _this.totalMoney = res.data.result.totalMoney;
                    console.log(_this.productList + " " + _this.totalMoney)
                },
                function() { alert("调用ajax失败"); }
            )
        },
        changeMoney: function(product, way) { //监听加减
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity <= 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item) { //选中事件
            if (item.checked == undefined || item.checked == null) {
                // Vue.set(item, "checked", true); //全局注册往item里注册一个checked:true
                this.$set(item, "checked", true) //局部注册
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag) { //全部选中事件
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, "checked", _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            })
            this.calcTotalPrice();
        },
        calcTotalPrice: function() { //计算总金额
            this.totalMoney = 0;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                } else {}
            })
        },
        delProduct: function() { //确定删除Yes
            //模拟删除
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        },
        delConfim: function(item) { //删除
            this.delFlag = true;
            this.curProduct = item;
        },
    }
})
Vue.filter("money", function(value, type) { //全局过滤器
    return "￥" + value.toFixed(2) + type;
})