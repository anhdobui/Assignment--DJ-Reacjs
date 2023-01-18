import classNames from 'classnames/bind';
import styles from './ContactUs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhone,
    faVoicemail,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ContactUs({ data }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('label')}>
                <span>{data.label}</span>
            </h4>
            <div className={cx('block-content')}>
                <div className={cx('contact-rich')}>
                    <strong>{data.dataContact.name}</strong>
                    <span>
                        <p>
                            <FontAwesomeIcon icon={faPhone} />
                        </p>
                        <p>971 21 00 93</p>
                    </span>
                    <span>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </p>
                        <p>userexperience@muroexe.com</p>
                    </span>
                    <span>
                        <p>Monday to Friday, from 09h to 18h.</p>
                    </span>
                    <span>
                        <p>
                            © Copyright MASCARO DIGITAL PROJECTS S.L. 2022. All
                            rights reserved.
                        </p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
