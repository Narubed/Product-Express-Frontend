import Helmet from 'react-helmet';
import React, { useState } from 'react';
import SlideToggle from 'react-slide-toggle';

import ShopBanner from '~/components/partials/shop/shop-banner';
import SidebarFilterTwo from '~/components/partials/shop/sidebar/sidebar-filter-two'
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';
import ToolBox from '~/components/partials/shop/toolbox';

function Shop() {
    let expanded = false;
    const [ totalCount, setTotalCount ] = useState( 0 );

    const onChangeCount = ( count ) => {
        setTotalCount( count );
    }

    return (
        <main className="main navigation-filter">
            <Helmet>
                <title>Riode React eCommerce Template - Shop Page</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Shop Page</h1>

            <ShopBanner />

            <div className="page-content mb-10 pb-2">
                <div className="container-fluid">
                    <div className="toolbox-wrap">
                        <SlideToggle collapsed={ expanded ? false : true } >
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div className={ `card navigation-card ${ toggleState.toLowerCase() }` }>
                                    <div className="card-header" onClick={ onToggle } >
                                        <span className="toggle">
                                            <span className="navigation-toggle-btn d-none">toggle button</span>
                                        </span>
                                    </div>

                                    <div ref={ setCollapsibleElement }>
                                        <div className={ `card-body p-0 ${ toggleState.toLowerCase() }` }>
                                            <SidebarFilterTwo />
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </SlideToggle >

                        <ToolBox type="navigation" totalCount={ totalCount } />
                    </div>

                    <ProductListOne isToolbox={ false } itemsPerRow={ 6 } onChangeCount={ onChangeCount } />
                </div>
            </div>
        </main >
    )
}

export default React.memo( Shop );