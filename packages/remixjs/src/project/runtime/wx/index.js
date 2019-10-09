
import { callbackTemplate, optionsTemplate, argumentsTemplate } from './template';

export * from './request';
export * from './selector';

// common
export const getCurrentRoutes = argumentsTemplate('getCurrentRoutes');
export const getCurrentRoute = argumentsTemplate('getCurrentRoute');

// 系统
export const canIUse = argumentsTemplate('canIUse');
export const getSystemInfo = optionsTemplate('getSystemInfo');

// 调试
export const setEnableDebug = optionsTemplate('setEnableDebug');

// 路由
export const switchTab = optionsTemplate('switchTab');
export const reLaunch = optionsTemplate('reLaunch');
export const redirectTo = optionsTemplate('redirectTo');
export const navigateTo = optionsTemplate('navigateTo');
export const navigateBack = optionsTemplate('navigateBack');


// 界面交互
export const showToast = optionsTemplate('showToast');
export const showModal = optionsTemplate('showModal');
export const showLoading = optionsTemplate('showLoading');
export const showActionSheet = optionsTemplate('showActionSheet');
export const hideToast = optionsTemplate('hideToast');
export const hideLoading = optionsTemplate('hideLoading');

// 导航
export const showNavigationBarLoading = optionsTemplate('showNavigationBarLoading');
export const setNavigationBarTitle = optionsTemplate('setNavigationBarTitle');
export const setNavigationBarColor = optionsTemplate('setNavigationBarColor');
export const hideNavigationBarLoading = optionsTemplate('hideNavigationBarLoading');

// 背景
export const setBackgroundTextStyle = optionsTemplate('setBackgroundTextStyle');
export const setBackgroundColor = optionsTemplate('setBackgroundColor');

// TarBar
export const showTabBarRedDot = optionsTemplate('showTabBarRedDot');
export const showTabBar = optionsTemplate('showTabBar');
export const setTabBarStyle = optionsTemplate('setTabBarStyle');
export const setTabBarItem = optionsTemplate('setTabBarItem');
export const setTabBarBadge = optionsTemplate('setTabBarBadge');
export const removeTabBarBadge = optionsTemplate('removeTabBarBadge');
export const hideTabBarRedDot = optionsTemplate('hideTabBarRedDot');
export const hideTabBar = optionsTemplate('hideTabBar');

// 字体
export const loadFontFace = optionsTemplate('loadFontFace');

// 刷新
export const stopPullDownRefresh = optionsTemplate('stopPullDownRefresh');
export const startPullDownRefresh = optionsTemplate('startPullDownRefresh');

// 滚动
export const pageScrollTo = optionsTemplate('pageScrollTo');

// 置顶
export const setTopBarText = optionsTemplate('setTopBarText');

// 时间片
export const nextTick = optionsTemplate('nextTick');

// 菜单
export const getMenuButtonBoundingClientRect = optionsTemplate('getMenuButtonBoundingClientRect');

// 窗口
export const onWindowResize = optionsTemplate('onWindowResize');

// 数据缓存
export const setStorage = optionsTemplate('setStorage');
export const removeStorage = optionsTemplate('removeStorage');
export const getStorageInfo = optionsTemplate('getStorageInfo');
export const getStorage = optionsTemplate('getStorage');
export const clearStorage = optionsTemplate('clearStorage');

// 图片
export const saveImageToPhotosAlbum = optionsTemplate('saveImageToPhotosAlbum');
export const previewImage = optionsTemplate('previewImage');
export const getImageInfo = optionsTemplate('getImageInfo');
export const compressImage = optionsTemplate('compressImage');
export const chooseMessageFile = optionsTemplate('chooseMessageFile');
export const chooseImage = optionsTemplate('chooseImage');

// 位置
export const openLocation = optionsTemplate('openLocation');
export const getLocation = optionsTemplate('getLocation');
export const chooseLocation = optionsTemplate('chooseLocation');

// 转发
export const updateShareMenu = optionsTemplate('updateShareMenu');
export const showShareMenu = optionsTemplate('showShareMenu');
export const hideShareMenu = optionsTemplate('hideShareMenu');
export const getShareInfo = optionsTemplate('getShareInfo');

// 登陆
export const login = optionsTemplate('login');
export const checkSession = optionsTemplate('checkSession');

// 小程序跳转
export const navigateToMiniProgram = optionsTemplate('navigateToMiniProgram');
export const navigateBackMiniProgram = optionsTemplate('navigateBackMiniProgram');

// 账号信息
export const getAccountInfoSync = optionsTemplate('getAccountInfoSync');

// 用户信息
export const getUserInfo = optionsTemplate('getUserInfo');

// 授权
export const authorize = optionsTemplate('authorize');

// 设置
export const openSetting = optionsTemplate('openSetting');
export const getSetting = optionsTemplate('getSetting');
// export const authorize = optionsTemplate('authorize');

// 地址
export const chooseAddress = optionsTemplate('chooseAddress');

// 卡券
export const openCard = optionsTemplate('openCard');
export const addCard = optionsTemplate('addCard');

// 发票
export const chooseInvoiceTitle = optionsTemplate('chooseInvoiceTitle');
export const chooseInvoice = optionsTemplate('chooseInvoice');

// 运动数据
export const getWeRunData = optionsTemplate('getWeRunData');

// 生物认证
export const startSoterAuthentication = optionsTemplate('startSoterAuthentication');
export const checkIsSupportSoterAuthentication = optionsTemplate('checkIsSupportSoterAuthentication');
export const checkIsSoterEnrolledInDevice = optionsTemplate('checkIsSoterEnrolledInDevice');

// 联系人
export const addPhoneContact = optionsTemplate('addPhoneContact');

// 电池
export const getBatteryInfo = optionsTemplate('getBatteryInfo');

// 粘贴板
export const setClipboardData = optionsTemplate('setClipboardData');
export const getClipboardData = optionsTemplate('getClipboardData');

// 网络
export const onNetworkStatusChange = callbackTemplate('onNetworkStatusChange');
export const getNetworkType = optionsTemplate('getNetworkType');

// 屏幕
export const setScreenBrightness = optionsTemplate('setScreenBrightness');
export const setKeepScreenOn = optionsTemplate('setKeepScreenOn');
export const onUserCaptureScreen = callbackTemplate('onUserCaptureScreen');
export const getScreenBrightness = optionsTemplate('getScreenBrightness');

// 电话
export const makePhoneCall = optionsTemplate('makePhoneCall');

// 加速计
export const stopAccelerometer = optionsTemplate('stopAccelerometer');
export const startAccelerometer = optionsTemplate('startAccelerometer');
export const onAccelerometerChange = optionsTemplate('onAccelerometerChange');

// 陀螺仪
export const stopGyroscope = optionsTemplate('stopGyroscope');
export const startGyroscope = optionsTemplate('startGyroscope');
export const onGyroscopeChange = callbackTemplate('onGyroscopeChange');

// 设备方向
export const stopDeviceMotionListening = optionsTemplate('stopDeviceMotionListening');
export const startDeviceMotionListening = optionsTemplate('startDeviceMotionListening');
export const onDeviceMotionChange = callbackTemplate('onDeviceMotionChange');

// 扫码
export const scanCode = optionsTemplate('scanCode');

// 性能
export const onMemoryWarning = callbackTemplate('onMemoryWarning');

// 震动
export const vibrateShort = optionsTemplate('vibrateShort');
export const vibrateLong = optionsTemplate('vibrateLong');

// 第三方平台
export const getExtConfig = optionsTemplate('getExtConfig');




