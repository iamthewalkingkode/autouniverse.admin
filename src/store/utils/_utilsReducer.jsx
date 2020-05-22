import { SET_SITE_LANG, SET_PAGE_TITLE, SET_PAGE_SUB_TITLE, SET_SET_SETTINGS } from '../_types';
import * as func from '../../providers/functions';

const initialState = {
    pageTitle: 'AutoUniverse',
    pageSubTitle: '',
    lang: 'en',

    carparts: func.getStorageJson('carparts'),
    locations: func.getStorageJson('locations'),
    settings: func.getStorageJson('settings'),

    navigation: {
        items: [
            {
                name: 'Dashboard', url: '/dashboard', icon: 'icon-speedometer', code: ''
            },
            {
                name: 'Auto Parts', url: '/autoparts', icon: 'icon-wrench', code: 'itm',
                children: [
                    { name: 'Dealers', url: '/autoparts/dealers', code: 'del' },
                    { name: 'AutoParts', url: '/autoparts/autoparts', code: 'itm' },
                    { name: 'Orders', url: '/autoparts/order', code: 'itm_ord' },
                ]
            },
            {
                name: 'Mechanics', url: '/mechanics', icon: 'icon-anchor', code: 'mec',
                children: [
                    { name: 'Mechanics', url: '/mechanics', code: 'mec' },
                    { name: 'Orders', url: '/mechanics/orders', code: 'mec_ord' }
                ]
            },
            {
                name: 'Emergencies', url: '/emergencies', icon: 'icon-fire', code: 'emg',
                children: [
                    { name: 'Emergency Services', url: '/emergencies', code: 'emg' },
                    { name: 'Manage Categories', url: '/emergencies/categories', code: 'emg_ctg' },
                    { name: 'Orders', url: '/emergencies/orders', code: 'emg_ord' }
                ]
            },
            {
                name: 'Auto Services', url: '/autoservices', icon: 'icon-cursor', code: 'aut',
                children: [
                    { name: 'Other Auto Services', url: '/autoservices', code: 'aut' },
                    { name: 'Manage Categories', url: '/autoservices/categories', code: 'aut_ctg' },
                    { name: 'Orders', url: '/autoservices/orders', code: 'aut_ord' }
                ]
            },
            {
                name: 'Expert Advice', url: '/expertadvices', icon: 'icon-speedometer', code: 'adv',
                children: [
                    { name: 'Expert advice', url: '/expertadvices', code: 'adv' },
                    { name: 'Manage Categories', url: '/expertadvices/categories', code: 'adv_ctg' }
                ]
            },
            {
                name: 'Users', url: '/users', icon: 'icon-user', code: 'usr',
                children: [
                    { name: 'Normal users', url: '/users/normal', code: 'usr_nom' },
                    { name: 'User access', url: '/users/access', code: 'usr_acc' },
                    { name: 'Admin users', url: '/users/admin', code: 'usr_adm' }
                ]
            },
            {
                name: 'Reports', url: '/reports', icon: 'icon-chart', code: 'rep',
                children: [
                    { name: 'Subscriptions', url: '/reports/subscriptions', code: 'rep_subs' },
                    { name: 'Rating', url: '/reports/rating', code: 'rep_rating' },
                    { name: 'Auto parts dealers', url: '/reports/dealers', code: 'rep_del' },
                    { name: 'Join date', url: '/reports/joindate', code: 'rep_join' },
                    { name: 'Views', url: '/reports/views', code: 'rep_views' },
                    { name: 'Orders', url: '/reports/orders', code: 'rep_orders' }
                ]
            },
            {
                name: 'Setup', url: '/setup', icon: 'icon-settings',
                children: [
                    { name: 'Subscriptions', url: '/setup/subscriptions' }
                ]
            },
        ]
    }
};

const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.title
            }

        case SET_PAGE_SUB_TITLE:
            return {
                ...state,
                pageSubTitle: action.title
            };

        case SET_SITE_LANG:
            return {
                ...state,
                lang: action.lang
            };

        case SET_SET_SETTINGS:
            return {
                ...state,
                [action.key]: action.value
            };
    }
};


export default utilsReducer;