const mockedBrands = {
    brands: [
        {
            id: '/api/brands/3',
            brand: 'Alfa Romeo',
            isActive: true,
            image: 'alfa-romeo.png',
            models: [
                {
                    id: '/api/models/349',
                    model: 'Giulia',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/356',
                    model: 'Giulietta',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/444',
                    model: 'Stelvio',
                    modelYear: 2018,
                },
            ],
        },
        {
            id: '/api/brands/6',
            brand: 'Audi',
            isActive: true,
            image: 'audi.png',
            models: [
                {
                    id: '/api/models/418',
                    model: 'A3',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/515',
                    model: 'A4',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/516',
                    model: 'A5',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/481',
                    model: 'A6',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/506',
                    model: 'A7',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/427',
                    model: 'A8',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/417',
                    model: 'Q2',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/505',
                    model: 'Q3',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/528',
                    model: 'Q5',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/494',
                    model: 'Q7',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/467',
                    model: 'Q8',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/301',
                    model: 'TT',
                    modelYear: 2015,
                },
            ],
        },
        {
            id: '/api/brands/8',
            brand: 'BMW',
            isActive: true,
            image: 'bmw.png',
            models: [
                {
                    id: '/api/models/478',
                    model: 'Serie 1',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/546',
                    model: 'Serie 2',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/457',
                    model: 'Serie 3',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/520',
                    model: 'Serie 4',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/521',
                    model: 'Serie 5',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/547',
                    model: 'Serie 7',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/489',
                    model: 'Serie 8',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/490',
                    model: 'X1',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/431',
                    model: 'X2',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/432',
                    model: 'X3',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/438',
                    model: 'X4',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/456',
                    model: 'X5',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/517',
                    model: 'X6',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/491',
                    model: 'X7',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/548',
                    model: 'Z4',
                    modelYear: 2021,
                },
            ],
        },
        {
            id: '/api/brands/16',
            brand: 'Citroen',
            isActive: true,
            image: 'citroen.png',
            models: [
                {
                    id: '/api/models/448',
                    model: 'Berlingo',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/26',
                    model: 'C-Elysee',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/514',
                    model: 'C3',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/387',
                    model: 'C3 Aircross',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/454',
                    model: 'C5 Aircross',
                    modelYear: 2019,
                },
            ],
        },
        {
            id: '/api/brands/17',
            brand: 'Dacia',
            isActive: true,
            image: 'dacia.png',
            models: [
                {
                    id: '/api/models/4',
                    model: 'Dokker',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/557',
                    model: 'Duster',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/3',
                    model: 'Lodgy',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/375',
                    model: 'Logan',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/374',
                    model: 'Sandero',
                    modelYear: 2016,
                },
            ],
        },
        {
            id: '/api/brands/77',
            brand: 'DS',
            isActive: true,
            image: 'ds.png',
            models: [
                {
                    id: '/api/models/476',
                    model: 'DS3 Crossback',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/423',
                    model: 'DS7 Crossback',
                    modelYear: 2018,
                },
            ],
        },
        {
            id: '/api/brands/23',
            brand: 'Fiat',
            isActive: true,
            image: 'fiat.png',
            models: [
                {
                    id: '/api/models/342',
                    model: '500',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/343',
                    model: '500C',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/474',
                    model: '500X',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/406',
                    model: 'Doblo Panorama',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/352',
                    model: 'Fullback',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/341',
                    model: 'Panda',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/407',
                    model: 'Tipo 4p',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/408',
                    model: 'Tipo 5p',
                    modelYear: 2018,
                },
            ],
        },
        {
            id: '/api/brands/24',
            brand: 'Ford',
            isActive: true,
            image: 'ford.png',
            models: [
                {
                    id: '/api/models/385',
                    model: 'Ecosport',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/493',
                    model: 'Everest',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/502',
                    model: 'Explorer',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/446',
                    model: 'Fiesta',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/513',
                    model: 'Focus',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/550',
                    model: 'Fusion',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/519',
                    model: 'Kuga',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/230',
                    model: 'Ranger',
                    modelYear: 2014,
                },
            ],
        },
        {
            id: '/api/brands/27',
            brand: 'Honda',
            isActive: true,
            image: 'honda.png',
            models: [
                {
                    id: '/api/models/409',
                    model: 'Civic',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/529',
                    model: 'CR-V',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/458',
                    model: 'HR-V',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/507',
                    model: 'Jazz',
                    modelYear: 2020,
                },
            ],
        },
        {
            id: '/api/brands/29',
            brand: 'Hyundai',
            isActive: true,
            image: 'hyundai.png',
            models: [
                {
                    id: '/api/models/553',
                    model: 'Accent',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/534',
                    model: 'Creta',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/532',
                    model: 'i10',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/392',
                    model: 'i20',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/533',
                    model: 'i30',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/443',
                    model: 'Santa Fe',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/525',
                    model: 'Sonata',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/543',
                    model: 'Tucson',
                    modelYear: 2021,
                },
            ],
        },
        {
            id: '/api/brands/33',
            brand: 'Jaguar',
            isActive: true,
            image: 'jaguar.png',
            models: [
                {
                    id: '/api/models/445',
                    model: 'E-Pace',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/536',
                    model: 'F-Pace',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/196',
                    model: 'F-type',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/531',
                    model: 'XE',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/552',
                    model: 'XF',
                    modelYear: 2021,
                },
            ],
        },
        {
            id: '/api/brands/34',
            brand: 'Jeep',
            isActive: true,
            image: 'jeep.png',
            models: [
                {
                    id: '/api/models/483',
                    model: 'Cherokee',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/522',
                    model: 'Compass',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/155',
                    model: 'Grand Cherokee',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/482',
                    model: 'Renegade',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/484',
                    model: 'Wrangler',
                    modelYear: 2020,
                },
            ],
        },
        {
            id: '/api/brands/35',
            brand: 'Kia',
            isActive: true,
            image: 'kia.png',
            models: [
                {
                    id: '/api/models/556',
                    model: 'Carnival',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/460',
                    model: 'Ceed',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/518',
                    model: 'K5',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/509',
                    model: 'Niro',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/450',
                    model: 'Picanto',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/479',
                    model: 'Rio',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/508',
                    model: 'Seltos',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/551',
                    model: 'Sorento',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/451',
                    model: 'Sportage',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/538',
                    model: 'Stinger',
                    modelYear: 2021,
                },
            ],
        },
        {
            id: '/api/brands/39',
            brand: 'Land Rover',
            isActive: true,
            image: 'land-rover.png',
            models: [
                {
                    id: '/api/models/421',
                    model: 'Discovery',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/499',
                    model: 'Discovery Sport',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/468',
                    model: 'Evoque',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/208',
                    model: 'Range Rover',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/429',
                    model: 'Range Rover Sport',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/430',
                    model: 'Velar',
                    modelYear: 2018,
                },
            ],
        },
        {
            id: '/api/brands/46',
            brand: 'Mazda',
            isActive: true,
            image: 'mazda.png',
            models: [
                {
                    id: '/api/models/492',
                    model: 'CX-3',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/289',
                    model: 'CX-5',
                    modelYear: 2015,
                },
                {
                    id: '/api/models/540',
                    model: 'Mazda3',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/288',
                    model: 'Mazda6',
                    modelYear: 2015,
                },
            ],
        },
        {
            id: '/api/brands/48',
            brand: 'Mercedes',
            isActive: true,
            image: 'mercedes.png',
            models: [
                {
                    id: '/api/models/475',
                    model: 'CLA',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/411',
                    model: 'Classe A',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/462',
                    model: 'Classe B',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/126',
                    model: 'Classe C',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/526',
                    model: 'Classe E',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/539',
                    model: 'Classe S',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/425',
                    model: 'CLS',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/510',
                    model: 'GLA',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/549',
                    model: 'GLC',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/463',
                    model: 'GLE',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/511',
                    model: 'GLS',
                    modelYear: 2020,
                },
            ],
        },
        {
            id: '/api/brands/50',
            brand: 'Mini',
            isActive: true,
            image: 'mini.png',
            models: [
                {
                    id: '/api/models/358',
                    model: 'Cabriolet',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/441',
                    model: 'Countryman',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/161',
                    model: 'Hatch',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/279',
                    model: 'Hatch 5 portes',
                    modelYear: 2015,
                },
            ],
        },
        {
            id: '/api/brands/51',
            brand: 'Mitsubishi',
            isActive: true,
            image: 'mitsubishi.png',
            models: [
                {
                    id: '/api/models/486',
                    model: 'L200',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/113',
                    model: 'Pajero Sport',
                    modelYear: 2014,
                },
            ],
        },
        {
            id: '/api/brands/52',
            brand: 'Nissan',
            isActive: true,
            image: 'nissan.png',
            models: [
                {
                    id: '/api/models/41',
                    model: 'Evalia',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/512',
                    model: 'Juke',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/398',
                    model: 'Micra',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/399',
                    model: 'Navara',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/247',
                    model: 'Qashqai',
                    modelYear: 2014,
                },
            ],
        },
        {
            id: '/api/brands/53',
            brand: 'Opel',
            isActive: true,
            image: 'opel.png',
            models: [
                {
                    id: '/api/models/487',
                    model: 'Astra',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/455',
                    model: 'Combo',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/495',
                    model: 'Corsa',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/537',
                    model: 'Crossland',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/434',
                    model: 'Grandland X',
                    modelYear: 2018,
                },
            ],
        },
        {
            id: '/api/brands/54',
            brand: 'Peugeot',
            isActive: true,
            image: 'peugeot.png',
            models: [
                {
                    id: '/api/models/488',
                    model: '2008',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/477',
                    model: '208',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/403',
                    model: '3008',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/401',
                    model: '301',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/402',
                    model: '308',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/545',
                    model: '5008',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/449',
                    model: '508',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/554',
                    model: 'Landtrek',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/466',
                    model: 'Rifter',
                    modelYear: 2019,
                },
            ],
        },
        {
            id: '/api/brands/57',
            brand: 'Porsche',
            isActive: true,
            image: 'porsche.png',
            models: [
                {
                    id: '/api/models/313',
                    model: '911',
                    modelYear: 2015,
                },
                {
                    id: '/api/models/541',
                    model: 'Cayenne',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/558',
                    model: 'Macan',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/367',
                    model: 'Panamera',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/542',
                    model: 'Taycan',
                    modelYear: 2021,
                },
            ],
        },
        {
            id: '/api/brands/58',
            brand: 'Renault',
            isActive: true,
            image: 'renault.png',
            models: [
                {
                    id: '/api/models/504',
                    model: 'Captur',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/503',
                    model: 'Clio',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/555',
                    model: 'Express',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/464',
                    model: 'Kadjar',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/144',
                    model: 'Kangoo',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/389',
                    model: 'Koleos',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/527',
                    model: 'Megane',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/377',
                    model: 'Megane Sedan',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/368',
                    model: 'Talisman',
                    modelYear: 2016,
                },
            ],
        },
        {
            id: '/api/brands/63',
            brand: 'Seat',
            isActive: true,
            image: 'seat.png',
            models: [
                {
                    id: '/api/models/497',
                    model: 'Arona',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/405',
                    model: 'Ateca',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/459',
                    model: 'Ibiza',
                    modelYear: 2019,
                },
            ],
        },
        {
            id: '/api/brands/65',
            brand: 'Skoda',
            isActive: true,
            image: 'skoda.png',
            models: [
                {
                    id: '/api/models/340',
                    model: 'Fabia',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/501',
                    model: 'Kamiq',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/414',
                    model: 'Karoq',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/415',
                    model: 'Kodiaq',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/413',
                    model: 'Octavia',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/500',
                    model: 'Scala',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/324',
                    model: 'Superb',
                    modelYear: 2016,
                },
            ],
        },
        {
            id: '/api/brands/67',
            brand: 'Ssangyong',
            isActive: true,
            image: 'ssangyong.png',
            models: [
                {
                    id: '/api/models/47',
                    model: 'Korando',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/43',
                    model: 'Rexton',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/46',
                    model: 'Stavic',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/372',
                    model: 'Tivoli',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/498',
                    model: 'XLV',
                    modelYear: 2020,
                },
            ],
        },
        {
            id: '/api/brands/69',
            brand: 'Suzuki',
            isActive: true,
            image: 'suzuki.png',
            models: [
                {
                    id: '/api/models/530',
                    model: 'Jimny',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/470',
                    model: 'Swift',
                    modelYear: 2019,
                },
            ],
        },
        {
            id: '/api/brands/71',
            brand: 'Toyota',
            isActive: true,
            image: 'toyota.png',
            models: [
                {
                    id: '/api/models/382',
                    model: 'C-HR',
                    modelYear: 2017,
                },
                {
                    id: '/api/models/452',
                    model: 'Corolla',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/535',
                    model: 'Corolla Cross',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/453',
                    model: 'Corolla Sedan',
                    modelYear: 2019,
                },
                {
                    id: '/api/models/397',
                    model: 'Fortuner',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/314',
                    model: 'Hilux',
                    modelYear: 2015,
                },
                {
                    id: '/api/models/357',
                    model: 'LC 200',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/59',
                    model: 'Prado',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/339',
                    model: 'Prius',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/480',
                    model: 'RAV4',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/524',
                    model: 'Yaris',
                    modelYear: 2021,
                },
            ],
        },
        {
            id: '/api/brands/72',
            brand: 'Volkswagen',
            isActive: true,
            image: 'volkswagen.png',
            models: [
                {
                    id: '/api/models/205',
                    model: 'Amarok',
                    modelYear: 2014,
                },
                {
                    id: '/api/models/353',
                    model: 'Caddy',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/331',
                    model: 'Passat',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/390',
                    model: 'Polo',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/544',
                    model: 'T-Roc',
                    modelYear: 2021,
                },
                {
                    id: '/api/models/378',
                    model: 'Tiguan',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/447',
                    model: 'Touareg',
                    modelYear: 2019,
                },
            ],
        },
        {
            id: '/api/brands/73',
            brand: 'Volvo',
            isActive: true,
            image: 'volvo.png',
            models: [
                {
                    id: '/api/models/496',
                    model: 'S60',
                    modelYear: 2020,
                },
                {
                    id: '/api/models/351',
                    model: 'S90',
                    modelYear: 2016,
                },
                {
                    id: '/api/models/439',
                    model: 'XC40',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/440',
                    model: 'XC60',
                    modelYear: 2018,
                },
                {
                    id: '/api/models/107',
                    model: 'XC90',
                    modelYear: 2015,
                },
            ],
        },
    ],
};

export default mockedBrands;
