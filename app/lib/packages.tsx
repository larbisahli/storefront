import { HeaderPlaceholder } from '@components';
import dynamic from 'next/dynamic';

const dynamicComponents = {
    '@dropgala/luma': {
        Header: dynamic(() => import('@dropgala/luma/Header'), {
            loading: () => <HeaderPlaceholder/>,
            ssr: false
          })
    }
}

export default dynamicComponents