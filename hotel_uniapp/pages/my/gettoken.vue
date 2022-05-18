<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="获取代币" :border-bottom="false"></fa-navbar>
		<!-- <view class="u-p-30"><u-input v-model="content" type="textarea" height="300" :border="true" /></view> -->
		<view class="u-p-30">
			<u-cell-group>				
				<!-- <u-cell-item icon="order" title="房间订单" @click="goPage('/pages/order/houseorder',true)"></u-cell-item> -->
				<u-cell-item icon="lock-opened-fill" title="ERC20代币" :arrow="false" :label="'余额: ' + erc20">
					<u-button class="bu"  :custom-style="{ backgroundColor: theme.bgColor, color: theme.color}" @click="submit">获取1000个</u-button>
					<!-- <u-radio slot="right-icon" name="privacy" :active-color="theme.bgColor"></u-radio> -->
				</u-cell-item>
				<u-cell-item icon="lock-fill" title="隐私代币" :arrow="false" :label="'余额: ' + ptn">
					<u-radio slot="right-icon" name="privacy" :active-color="theme.bgColor"></u-radio>
				</u-cell-item>

			</u-cell-group>

			<!-- <u--text type="primary" text="主色"></u--text> -->
			
		</view>
	</view>
</template>

<script>
export default {
	onLoad() {
		this.getBalance()
	},
	data() {
		return {
			erc20: 0,
			ptn: 0
		};
	},
	methods: {
		getBalance(){
			console.log('geterc20')
			// console.log(res)
			// this.$api.getBalance().then(res => {
			// 	this.erc20 = res.balance
			// 	console.log(res)
			// })
		},
		submit(){
			this.$api.getErc20({
				user: this.vuex_user.nickname,
				value: 1000
			}).then(res=>{
				if (res.code){
					this.$u.toast("获取成功")
					
				}
			})
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #FFFFFF;
}

.bu{
	width: 30px;
}

</style>
