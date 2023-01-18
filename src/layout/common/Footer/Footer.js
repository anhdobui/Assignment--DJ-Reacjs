import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { ContactUs, Copyright, Menu, Social } from './component';
const cx = classNames.bind(styles);

const _Menu_footer = [
    {
        label: 'Muroexe World',
        children: [
            {
                title: 'About us',
                path: '/',
            },
            {
                title: 'Sustainability and commitment',
                path: '/',
            },
            {
                title: 'Ordering for companies',
                path: '/',
            },
            {
                title: 'Design process',
                path: '/',
            },
            {
                title: 'Blog',
                path: '/',
            },
            {
                title: 'Partnerships',
                path: '/',
            },
        ],
        type: 'Menu',
    },
    {
        label: 'Information',
        children: [
            {
                title: 'Help center',
                path: '/',
            },
            {
                title: 'Legal notice and privacy policy',
                path: '/',
            },
        ],
        type: 'Menu',
    },
    {
        label: 'Information',
        children: [
            {
                title: 'Help center',
                path: '/',
            },
            {
                title: 'Legal notice and privacy policy',
                path: '/',
            },
        ],
        type: 'Menu',
    },
    {
        label: 'Contact us',
        dataContact: {
            name: 'Muro',
            phone: '971 21 00 93',
            email: 'userexperience@muroexe.com',
            timeWork: 'Monday to Friday, from 09h to 18h.',
            note: '© Copyright MASCARO DIGITAL PROJECTS S.L. 2022. All rights reserved.',
        },
        type: 'ContactUs',
    },
];

const _Social = [
    {
        name: 'facebook',
        href: 'https://www.facebook.com/tintucvtv24',
    },
    {
        name: 'twitter',
        href: 'https://www.facebook.com/tintucvtv24',
    },
    {
        name: 'instagram',
        href: 'https://www.facebook.com/tintucvtv24',
    },
    {
        name: 'linkedin',
        href: 'https://www.facebook.com/tintucvtv24',
    },
];
function Footer({ menuFooter = _Menu_footer, social = _Social }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    {menuFooter.map((item, index) => {
                        const Comp = item.type == 'Menu' ? Menu : ContactUs;
                        return <Comp key={index} data={item} />;
                    })}
                </header>
                <section className={cx('body')}>
                    <Social data={social} />
                </section>
                <footer className={cx('footer')}>
                    <Copyright />
                </footer>
            </div>
        </div>
    );
}

export default Footer;
