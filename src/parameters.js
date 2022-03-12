export const TIMEZONE = 'Africa/Casablanca';
export const LOCALE = 'en-US';
export const CURRENCY = 'MAD';
export const LANG = 'en';
export const COUNTRY = 'Maroc';

export const COOKIE_MAX_AGE = 2592000; // 30 days
export const COOKIE_MAX_AGE_USER_REMINDERS = 300;
export const COOKIE_SAME_SITE = 'strict';

export const UPLOAD_MAX_SIZE = 3000000; // bytes
export const MODEL_IMAGE_ACCEPTED_MIME_TYPES = ['image/jpeg'];

export const TOKEN_TTL = 3600; // seconds
export const MAX_IDLE_TIME = 3500;
export const IDLE_TIME_LOGOUT = 60;

export const REVALIDATE_INTERVAL = 3600; // how ofter to refresh data from API

export const REDIRECT_TIMER = 4000; // 4 seconds

export const ITEMS_PER_PAGE = 10;

export const PRICE_RANGES = [
    [1, 125000],
    [125001, 150000],
    [150001, 175000],
    [175001, 200000],
    [200001, 225000],
    [225001, 250000],
    [250001, 300000],
    [300001, 400000],
    [400001, 500000],
    [500001, 800000],
    [800001, 1100000],
    [1100001, 5000000],
];

export const PRICE_RANGES_SHORT = [
    ['0', '200000'],
    ['200000', '300000'],
    ['300000', '400000'],
    ['400000'],
];

export const CONVERSION_FUEL = {
    diesel: 'die',
    gas: 'ess',
    hybrid: 'hyb',
    electric: 'ele',
};

export const AUTOMATIC_GEARBOXES = [
    'a1',
    'a2',
    'a4',
    'a5',
    'a6',
    'a7',
    'a8',
    'a9',
    'a10',
    'cvt',
];

export const TRIMS_AIR_COND_AUTO = [
    '/api/trims/37',
    '/api/trims/38',
    '/api/trims/205',
    '/api/trims/251',
];

export const BODY_TYPES = [
    'berline',
    'break',
    'cabriolet',
    'coupe',
    'monospace',
    'pick-up',
    'spider',
    'SUV',
];

export const GEARBOXES = [
    'A1',
    'A2',
    'A4',
    'A5',
    'A6',
    'A7',
    'A8',
    'A9',
    'A10',
    'CVT',
    'M5',
    'M6',
    'M7',
];

export const PLACES = [2, 3, 4, 5, 6, 7];

export const DOORS = [2, 3, 4, 5];

export const TRACTIONS = ['4x4', 'propulsion', 'traction'];

export const FUELS = ['diesel', 'electric', 'gas', 'hybrid'];

export const CYLINDERS = [null, 3, 4, 5, 6, 8];

export const VALVES = [null, 8, 12, 16, 20, 24, 32];

export const ASPIRATIONS = [
    null,
    'bi-turbo',
    'natural',
    'supercharged',
    'tri-turbo',
    'turbo',
];

export const TRIM_TYPES = ['com', 'easy', 'ent', 'help', 'sec', 'sty'];

export const TRIMS_DISPLAY_MULTIMEDIA = ['/api/trims/273', '/api/trims/463'];

export const TRIMS_LEATHER_SEATS = ['/api/trims/115', '/api/trims/284', '/api/trims/541'];

export const MUI_DATATABLES_TEXT_LABELS = {
    body: {
        noMatch: 'Désolé, aucun résultat ne correspond à vos critère',
        toolTip: 'Trier',
        columnHeaderTooltip: (column) => `Trier par ${column.label}`,
    },
    pagination: {
        next: 'Prochaine Page',
        previous: 'Page précédente',
        rowsPerPage: 'lignes par page:',
        displayRows: 'de',
    },
    toolbar: {
        search: 'Recherche',
        downloadCsv: 'télécharger CSV',
        print: 'Imprimer',
        viewColumns: 'Afficher les colonnes',
        filterTable: 'Filtrer tableau',
    },
    filter: {
        all: 'Tous',
        title: 'Filtres',
        reset: 'Réinitialiser',
    },
    viewColumns: {
        title: 'Afficher les colonnes',
        titleAria: 'Afficher/Masquer colonnes',
    },
    selectedRows: {
        text: ' ligne(s) sélectionnée(s)',
        delete: 'Supprimer',
        deleteAria: 'Supprimer lignes sélectionnées',
    },
};
