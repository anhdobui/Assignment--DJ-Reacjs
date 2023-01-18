import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Breadcrumb({dataDirect ,local}) {
    return ( <div className={cx('wrapper')} >
        <div className={cx('container')}>
            <ol className={cx('breadcrumb')}>
                <li><Link to="/">Home</Link></li>
                {dataDirect && dataDirect.length > 0 && (
                    dataDirect.map((direct,index) => {
                        return <li key={index} ><Link to={direct.path || ''}>{direct.name || ''}</Link></li>
                    })
                )}
                <li>{local}</li>
            </ol>
        </div>
    </div> );
}

export default Breadcrumb;