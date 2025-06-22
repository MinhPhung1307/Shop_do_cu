import React from 'react';
import ProductItem from '../../components/ProductItemComponent/ProductItem';
const OrderPage = () => {
 return (
        <div>
            <ProductItem
                IMG="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                NAME="Giáo trình triết haoid adhuashd gdjha udthf ngu dr hdsrf uhbbdrug dsfuyhig g"
                PRICE="45.000"
                STATUS="Chờ bán"
            />
            <ProductItem
                IMG="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                NAME="Giáo trình triết haoid adhuashd gdjha udthf ngu dr hdsrf uhbbdrug dsfuyhig g"
                PRICE="45.000"
                STATUS="Đã mua"
            />
            <ProductItem
                IMG="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                NAME="Giáo trình triết haoid adhuashd gdjha udthf ngu dr hdsrf uhbbdrug dsfuyhig g"
                PRICE="45.000"
                STATUS="Đã bán"
            />
        </div>
    )
}

export default OrderPage;