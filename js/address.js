var vm = new Vue({
    el: '.container',
    data: { //绑定的数据
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1,
    },
    mounted: function() { //默认调用
        this.$nextTick(function() {
            this.getAddressList();
        });
    },
    computed: { //实时计算
        filterAddress: function() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: { //绑定的事件
        getAddressList: function() {
            var _this = this;
            this.$http.get("data/address.json").then(function(response) {
                var res = response.data;
                if (res.status == "0") {
                    _this.addressList = res.result;
                    console.log(_this.addressList);
                }
            }, function() {
                alert("Ajax调用失败")
            });
        },
        loadMore: function() {
            if (this.limitNum == this.addressList.length) {
                this.limitNum = 3;
            } else {
                this.limitNum = this.addressList.length;
            }
        },
        setDefault: function(addressId) {
            this.addressList.forEach(function(address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            })
        }
    }
})