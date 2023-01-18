import classNames from "classnames/bind";
import styles from './DropTable.module.scss'
const cx = classNames.bind(styles)
const fake = [
    {
        key:'Colour',
        values:'Grape'
    },
    {
        key:'Style',
        values:'Minimalist Smart And Formal',
    }
]
function DropTable({data = fake}) {
    return ( <div className={cx('wrapper')}>
       <div className={cx('container')}>
            <table className={cx('table')}>
                <tbody>
                    {data && data.length>0 && data.map((item,index) => {
                        if(item.values){
                            return (
                                <tr key={index}>
                                    <td>{item.key}</td>
                                    <td>{item.values}</td>
                                </tr>
                            )
                        }else{
                            return
                        }
                        })}
                </tbody>
            </table>
       </div>
    </div> );
}

export default DropTable;