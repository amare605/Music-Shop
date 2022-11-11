# Music-Shop
此為使用MERN技術棧，切板採用React Bootstrap的電商專案
 
![image](https://user-images.githubusercontent.com/107014215/201241472-52176b3d-a526-4452-8f7e-771f386784b4.png)


# Live Version
網址： https://stanmusicshop.herokuapp.com/


# 功能
會員功能：

1.會員管理：註冊會員/ 修改會員資料/ 查詢訂單

2.購物車：新增商品/ 填選配送地址/ 使用PAYPAL 結帳

管理員功能：

1.商品管理： 新增及修改商品資料

2.訂單管理： 勾選特定訂單進行出貨

3.使用者管理：修改及刪除會員資料

# 使用

# Env Variables
請於根目錄，新增.env 檔，檔案內容請填入

NODE_ENV = development

PORT = 5000

MONGO_URI = 您的 mongodb uri

JWT_SECRET = 'abc123'

PAYPAL_CLIENT_ID = 您的 client id

# Install Dependencies (frontend & backend)

npm install

cd frontend

npm install

# Run

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

