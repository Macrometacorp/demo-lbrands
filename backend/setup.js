const COLLECTIONS = [
    {
        name: 'FashionItemsTable',
        data: [
            {
                _key: 'DrapedBackVintageRose.jpeg',
                description:
                    'Big night in. You’ll love relaxing in this luxe jacquard cami set with an allover sheen and a gorgeous draped back.',
                heading: 'Draped Back Jacquard Cami Set',
                rating: 4.6,
                price: 49.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'DrapedBackVintageRose.jpeg',
                        name: 'Vintage Rose',
                        availableIn: ['06102', '19903', '20002'],
                    },
                    {
                        image: 'DrapedBackPersianTeal.jpeg',
                        name: 'Persian Teal',
                        availableIn: ['06102', '19903', '20002'],
                    },
                    {
                        image: 'DrapedBackDarkViolet.jpeg',
                        name: 'Dark Violet',
                        availableIn: ['06102', '19903', '20002'],
                    },
                ],
            },
            {
                _key: 'LacePlungeHotPink.jpeg',
                description:
                    'A sexy-sweet essential in lustrous satin with delicate sheer lace and eyelash trim.',
                heading: 'Lace Plunge Slip',
                rating: 4.6,
                price: 69.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'LacePlungeHotPink.jpeg',
                        name: 'Hot Pink',
                    },
                    {
                        image: 'LacePlungeGreen.jpeg',
                        name: 'Green',
                    },
                    {
                        image: 'LacePlungeCoconutWhite.jpeg',
                        name: 'Coconut White',
                    },
                ],
            },
            {
                _key: 'WickedOpenLipstick.jpeg',
                description:
                    'Featuring our Wicked bra with the push-up cup technology you love, this sheer mesh and floral lace apron is finished with luxe satin ties. A matching panty completes the look. Ideal for wearing on your wedding night and beyond.',
                heading: 'Wicked Open Back Babydoll',
                rating: 4.4,
                price: 89.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'WickedOpenLipstick.jpeg',
                        name: 'Lipstick',
                    },
                    {
                        image: 'WickedOpenCoconutWhite.jpeg',
                        name: 'Coconut White',
                    },
                    {
                        image: 'WickedOpenBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'ChantillyLaceEnvious.jpeg',
                description:
                    'A longer version of our classic wrap style, in luxe satin with a sheer Chantilly lace back.',
                heading: 'Chantilly Lace Robe',
                rating: 3.5,
                price: 99.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'ChantillyLaceEnvious.jpeg',
                        name: 'Envious',
                    },
                    {
                        image: 'ChantillyLaceLipstick.jpeg',
                        name: 'Lipstick',
                    },
                    {
                        image: 'ChantillyLaceBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'ChantillyLaceEnvious.jpeg',
                description:
                    'A longer version of our classic wrap style, in luxe satin with a sheer Chantilly lace back.',
                heading: 'Chantilly Lace Robe',
                rating: 3.5,
                price: 99.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'ChantillyLaceEnvious.jpeg',
                        name: 'Envious',
                    },
                    {
                        image: 'ChantillyLaceLipstick.jpeg',
                        name: 'Lipstick',
                    },
                    {
                        image: 'ChantillyLaceBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'BombshellVintageRose.jpeg',
                description:
                    'Intersecting straps are juxtaposed with delicate lace in this gorgeous teddy, showcasing flirty cutouts throughout. Featuring our Bombshell bra for the ultimate lift. Wear yours outside the bedroom with your favorite separates and more.',
                heading: 'Bombshell Add-2-cups Lace Teddy',
                rating: 4.3,
                price: 89.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'BombshellVintageRose.jpeg',
                        name: 'Vintage Rose',
                    },
                    {
                        image: 'BombshellLipstick.jpeg',
                        name: 'Lipstick',
                    },
                    {
                        image: 'BombshellBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'CottonJoggerLinenDahlia.jpeg',
                description:
                    "Crisp cotton is made to keep you cool and comfortable with a classic tee and jogger design you'll want to lounge in all day.",
                heading: 'Cotton Jogger Tee-jama',
                rating: 4.3,
                price: 49.5,
                category: 'SLEEP',
                images: [
                    {
                        image: 'CottonJoggerLinenDahlia.jpeg',
                        name: 'Linen Dahlia',
                    },
                    {
                        image: 'CottonJoggerPinkHeartDot.jpeg',
                        name: 'Pink Heart Dot',
                    },
                    {
                        image: 'CottonJoggerNoirNavyStripe.jpeg',
                        name: 'Noir Navy Stripe',
                    },
                ],
            },
            {
                _key: 'SatinShortPinkFizz.jpeg',
                description:
                    'For a full eight hours (or more). A sleep-ready PJ set in luxe satin, with a button front, notch collar and decorative piping.',
                heading: 'Satin Short PJ Set',
                rating: 4.2,
                price: 74.5,
                category: 'SLEEP',
                images: [
                    {
                        image: 'SatinShortPinkFizz.jpeg',
                        name: 'Pink Fizz',
                    },
                    {
                        image: 'SatinShortSweetDreamsScript.jpeg',
                        name: 'Sweet Dreams Script',
                    },
                    {
                        image: 'SatinShortPinkPopHeart.jpeg',
                        name: 'Pink Pop Heart',
                    },
                ],
            },
            {
                _key: 'LightweightPimaBrightPinkGraphic.jpeg',
                description:
                    'The best plans are cancelled plans: relax in this soft and durable cotton sleepshirt, featuring a V-neckline and rounded hem.',
                heading: 'Lightweight Pima Cotton V-neck Sleepshirt',
                rating: 4.3,
                price: 29.5,
                category: 'SLEEP',
                images: [
                    {
                        image: 'LightweightPimaBrightPinkGraphic.jpeg',
                        name: 'Bright Pink Graphic',
                    },
                    {
                        image: 'LightweightPimaLavender.jpeg',
                        name: 'Lavender',
                    },
                    {
                        image: 'LightweightPimaAquaCrystal.jpeg',
                        name: 'Aqua Crystal',
                    },
                ],
            },
            {
                _key: 'SatinRobeCoconutWhite.jpeg',
                description:
                    'A modern take on the classic robe, featuring a luxe satin silhouette with a tie waist, delicate lace trim and gorgeous, relaxed sleeves.',
                heading: 'Satin Robe',
                rating: 3.6,
                price: 49.99,
                category: 'SLEEP',
                images: [
                    {
                        image: 'SatinRobeCoconutWhite.jpeg',
                        name: 'Coconut White',
                    },
                    {
                        image: 'SatinRobeSageDust.jpeg',
                        name: 'Sage Dust',
                    },
                    {
                        image: 'SatinRobePinkStripe.jpeg',
                        name: 'Pink Stripe',
                    },
                ],
            },
            {
                _key: 'SatinLacePrint.jpeg',
                description:
                    'Lightweight style in satin and lace, this cami is perfect for wearing out or slipping into bed.',
                heading: 'Satin Lace-back Cami Top',
                rating: 4.5,
                price: 34.5,
                category: 'SLEEP',
                images: [
                    {
                        image: 'SatinLacePrint.jpeg',
                        name: 'Print',
                    },
                    {
                        image: 'SatinLaceGreen.jpeg',
                        name: 'Green',
                    },
                    {
                        image: 'SatinLaceRainbowSky.jpeg',
                        name: 'Rainbow Sky',
                    },
                ],
            },
            {
                _key: 'LogoShortPinkStripe.jpeg',
                description:
                    'XOXO, Victoria’s Secret. A classic robe featuring our logo.',
                heading: 'Cotton Jogger Tee-jama',
                rating: 4.8,
                price: 49.5,
                category: 'SLEEP',
                images: [
                    {
                        image: 'LogoShortPinkStripe.jpeg',
                        name: 'Pink Stripe',
                    },
                    {
                        image: 'LogoShortVSIvory.jpeg',
                        name: 'VS Ivory',
                    },
                    {
                        image: 'LogoShortBlueCharmTieDye.jpeg',
                        name: 'Blue Charm Tie Dye',
                    },
                ],
            },
            {
                _key: 'HavanaPushUpPreciousJade.jpeg',
                description:
                    'We have lift off! A classic banded halter with flattering push-up padding. Mix and match this style to find your perfect swim look.',
                heading: 'Havana Push-Up Halter Swim Top',
                rating: 4,
                price: 29.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'HavanaPushUpPreciousJade.jpeg',
                        name: 'Precious Jade',
                    },
                    {
                        image: 'HavanaPushUpBlackWhiteDot.jpeg',
                        name: 'Black & White Dot',
                    },
                    {
                        image: 'HavanaPushUpRipeApricot.jpeg',
                        name: 'Ripe Apricot',
                    },
                ],
            },
            {
                _key: 'MalibuFabSapphire.jpeg',
                description:
                    "A full-cup push-up that's fit to flirt. Get dramatic lift and customizable support. Mix and match this style to find your perfect swim look.",
                heading: 'Malibu Fabulous Push-Up Swim Top',
                rating: 4.4,
                price: 44.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'MalibuFabSapphire.jpeg',
                        name: 'Sapphire',
                    },
                    {
                        image: 'MalibuFabMintFrost.jpeg',
                        name: 'Mint Frost',
                    },
                    {
                        image: 'MalibuFabCheekyRed.jpeg',
                        name: 'Cheeky Red',
                    },
                ],
            },
            {
                _key: 'TahitiScoopOlive.jpeg',
                description:
                    "A little scoop that's perfect for a swim, this bikini top is a perfect addition to your vacation wardrobe.",
                heading: 'Tahiti Scoop Swim Top',
                rating: 4.3,
                price: 29.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'TahitiScoopLemonPrint.jpeg',
                        name: 'Lemon Print',
                    },
                    {
                        image: 'TahitiScoopNero.jpeg',
                        name: 'Nero',
                    },
                    {
                        image: 'TahitiScoopOlive.jpeg',
                        name: 'Olive',
                    },
                ],
            },
            {
                _key: 'MonacoSapphire.jpeg',
                description:
                    'The sexy sophistication of Monaco in a bikini you can wear everywhere, with an elegant longline cut and gleaming golden V-hardware at the center bust.',
                heading: 'Monaco V-Hardware Bralette Swim Top',
                rating: 4.3,
                price: 39.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'MonacoSapphire.jpeg',
                        name: 'Sapphire',
                    },
                    {
                        image: 'MonacoNero.jpeg',
                        name: 'Nero',
                    },
                    {
                        image: 'MonacoCheekyRed.jpeg',
                        name: 'Cheeky Red',
                    },
                ],
            },
            {
                _key: 'ShineStrapCosmo.jpeg',
                description:
                    'The same add-2-cups lift of your favorite Bombshell bra made for the beaches of Bali, finished with dazzling shine straps that glitter in the sun.',
                heading:
                    'Shine Strap Bali Bombshell Add-2-cups Push-Up Swim Top',
                rating: 4.4,
                price: 69.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'ShineStrapCosmo.jpeg',
                        name: 'Cosmo',
                    },
                    {
                        image: 'ShineStrapNero.jpeg',
                        name: 'Nero',
                    },
                    {
                        image: 'ShineStrapCheekyRed.jpeg',
                        name: 'Cheeky Red',
                    },
                ],
            },
            {
                _key: 'ShineMontanitaCosmo.jpeg',
                description:
                    'Bring the glamour with you when you splash in this one-piece, cut with a bold high leg and plunging neckline and finished with glittering shine straps.',
                heading: 'Shine Strap Montanita Plunge One-piece',
                rating: 3.3,
                price: 99.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'ShineMontanitaCosmo.jpeg',
                        name: 'Cosmo',
                    },
                    {
                        image: 'ShineMontanitaNero.jpeg',
                        name: 'Nero',
                    },
                    {
                        image: 'ShineMontanitaWhite.jpeg',
                        name: 'White',
                    },
                ],
            },
            {
                _key: 'FlowOnTealStar.jpeg',
                description:
                    'The perfect laid-back pick, this lounge bra supports your shape in a smooth seamless finish.',
                heading: 'Flow On Point Seamless Triangle Bra',
                rating: 3.5,
                price: 44.5,
                category: 'BRAS',
                images: [
                    {
                        image: 'FlowOnTealStar.jpeg',
                        name: 'Teal Star',
                    },
                    {
                        image: 'FlowOnMauvelous.jpeg',
                        name: 'Mauvelous',
                    },
                    {
                        image: 'FlowOnBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'LightlyLinedAppleblossomPink.jpeg',
                description:
                    'This dreamy demi is even more heavenly, with softer Memory Fit lining that conforms to your curves, a smoothing U-shaped back and stretchier lace sides for a flawless, ultra-comfy fit.',
                heading: 'Lightly-Lined Demi Bra',
                rating: 4.2,
                price: 49.5,
                category: 'BRAS',
                images: [
                    {
                        image: 'LightlyLinedAppleblossomPink.jpeg',
                        name: 'Appleblossom Pink',
                    },
                    {
                        image: 'LightlyLinedBlackFloral.jpeg',
                        name: 'Black Floral',
                    },
                    {
                        image: 'LightlyLinedClaretRed.jpeg',
                        name: 'Claret Red',
                    },
                ],
            },
            {
                _key: 'PushUpEnvious.jpeg',
                description:
                    'Our #1 push-up is sexier than ever with plush, even softer padding for the lift and cleavage you love and a more natural feel, plus edges that disappear under clothes.',
                heading: 'Push-Up Bra',
                rating: 4,
                price: 49.5,
                category: 'BRAS',
                images: [
                    {
                        image: 'PushUpEnvious.jpeg',
                        name: 'Envious',
                    },
                    {
                        image: 'PushUpLipstick.jpeg',
                        name: 'Lipstick',
                    },
                    {
                        image: 'PushUpSweetPraline.jpeg',
                        name: 'Sweet Praline',
                    },
                ],
            },
            {
                _key: 'PushupPerfectKir.jpeg',
                description:
                    'Get the lift you crave in a supersoft bra you’ll love to wear, here with picot trim. Featuring Memory Fit padding for extra support as it conforms to your curves and a smoothing U-shaped back.',
                heading: 'Push-Up Perfect Shape Lace Trim Bra',
                rating: 4.3,
                price: 49.5,
                category: 'BRAS',
                images: [
                    {
                        image: 'PushupPerfectKir.jpeg',
                        name: 'Kir',
                    },
                    {
                        image: 'PushupPerfectBlack.jpeg',
                        name: 'Black',
                    },
                    {
                        image: 'PushupPerfectPink.jpeg',
                        name: 'Pink',
                    },
                ],
            },
            {
                _key: 'UnlinedSoftFloralMedley.jpeg',
                description:
                    'The easiest decision you’ll make all day: wearing this ultra-soft and comfortable wireless bra, featuring a dramatic plunge neckline and a sporty logo band.',
                heading: 'Unlined Soft Wireless Lounge Bra',
                rating: 4.2,
                price: 29.5,
                category: 'BRAS',
                images: [
                    {
                        image: 'UnlinedSoftFloralMedley.jpeg',
                        name: 'Floral Medley',
                    },
                    {
                        image: 'UnlinedSoftSoftPink.jpeg',
                        name: 'Soft Pink',
                    },
                    {
                        image: 'UnlinedSoftLeopard.jpeg',
                        name: 'Leopard',
                    },
                ],
            },
            {
                _key: 'WirelessLaceBackSageDust.jpeg',
                description:
                    'Feel good, look good, do good: meet our first fully-constructed T-shirt bra made from partially recycled textiles, a smooth and streamlined style that helps support the environment while giving you the boost you crave. In an allover smooth silhouette with a delicate pleated tulle detail at the front and a lace-embellished band.',
                heading: 'Wireless Lace-back Bra',
                rating: 3.5,
                price: 44.5,
                category: 'BRAS',
                images: [
                    {
                        image: 'WirelessLaceBackSageDust.jpeg',
                        name: 'Sage Dust',
                    },
                    {
                        image: 'WirelessLaceBackWitheredRose.jpeg',
                        name: 'Withered Rose',
                    },
                    {
                        image: 'WirelessLaceBackWinterSky.jpeg',
                        name: 'Winter Sky',
                    },
                ],
            },
            {
                _key: 'LaceBrazilianDahlia.jpeg',
                description:
                    'The classic, stretch-waist lace panty you love, now in a chic leopard print.',
                heading: 'Lace Brazilian Panty',
                rating: 4.7,
                price: 14.5,
                category: 'PANTIES',
                images: [
                    {
                        image: 'LaceBrazilianDahlia.jpeg',
                        name: 'Dahlia',
                    },
                    {
                        image: 'LaceBrazilianSageDust.jpeg',
                        name: 'Sage Dust',
                    },
                    {
                        image: 'LaceBrazilianBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'LaceCheekyBlackPearl.jpeg',
                description:
                    'In soft, stretchy and lightweight micro fabric, this streamlined cheeky is played up with a delicate floral lace inset at the front, plus lace trim at the sides.',
                heading: 'Lace Cheeky Panty',
                rating: 4.5,
                price: 7.99,
                category: 'PANTIES',
                images: [
                    {
                        image: 'LaceCheekyBlackPearl.jpeg',
                        name: 'Black Pearl',
                    },
                    {
                        image: 'LaceCheekyMidnightSea.jpeg',
                        name: 'Midnight Sea',
                    },
                    {
                        image: 'LaceCheekyVelvetMaroon.jpeg',
                        name: 'Velvet Maroon',
                    },
                ],
            },
            {
                _key: 'LogoWaistKir.jpeg',
                description:
                    'Classically comfortable in breathable cotton, this shortie panty is your perfect everyday pick.',
                heading: 'Logo Waist Boyshort Panty',
                rating: 4.5,
                price: 12.5,
                category: 'PANTIES',
                images: [
                    {
                        image: 'LogoWaistKir.jpeg',
                        name: 'Kir',
                    },
                    {
                        image: 'LogoWaistLipstick.jpeg',
                        name: 'Lipstick',
                    },
                    {
                        image: 'LogoWaistCameo.jpeg',
                        name: 'Cameo',
                    },
                ],
            },
            {
                _key: 'SeamlessGreen.jpeg',
                description:
                    'Smooth, seamless comfort and an ultra high waist make this super stretchy panty endlessly flattering.',
                heading: 'Seamless High-waist Bikini Panty',
                rating: 2.3,
                price: 18.5,
                category: 'PANTIES',
                images: [
                    {
                        image: 'SeamlessGreen.jpeg',
                        name: 'Green',
                    },
                    {
                        image: 'SeamlessBrown.jpeg',
                        name: 'Brown',
                    },
                    {
                        image: 'SeamlessBeige.jpeg',
                        name: 'Beige',
                    },
                ],
            },
            {
                _key: 'StretchCottonCrownBlue.jpeg',
                description:
                    'Cotton. Sexy. Cool. Supersoft stretch cotton meets ultra-cool comfort in a high-leg brief panty perfect for wearing everywhere.',
                heading: 'Stretch Cotton High-leg Brief Panty',
                rating: 4.2,
                price: 10.5,
                category: 'PANTIES',
                images: [
                    {
                        image: 'StretchCottonCrownBlue.jpeg',
                        name: 'Crown Blue',
                    },
                    {
                        image: 'StretchCottonFadedDenim.jpeg',
                        name: 'Faded Denim',
                    },
                    {
                        image: 'StretchCottonRed.jpeg',
                        name: 'Red',
                    },
                ],
            },
            {
                _key: 'StretchHiphuggerSoftCrimson.jpeg',
                description:
                    'Cotton. Sexy. Cool. Supersoft stretch cotton meets ultra-cool comfort in a hiphugger panty perfect for wearing everywhere.',
                heading: 'Stretch Cotton Hiphugger Panty',
                rating: 4.2,
                price: 10.5,
                category: 'PANTIES',
                images: [
                    {
                        image: 'StretchHiphuggerSoftCrimson.jpeg',
                        name: 'Soft Crimson',
                    },
                    {
                        image: 'StretchHiphuggerLilac.jpeg',
                        name: 'Lilac',
                    },
                    {
                        image: 'StretchHiphuggerCameo.jpeg',
                        name: 'Cameo',
                    },
                ],
            },
            {
                _key: 'CottonFleeceFrostedBlueberry.jpeg',
                description:
                    'A cool, crisp cotton blend and a classic cut never go out of style, featuring a bold, lace-up detail.',
                heading: 'Cotton Fleece Lace Up Crewneck',
                rating: 4.3,
                price: 49.5,
                category: 'SPORT & LOUNGE',
                images: [
                    {
                        image: 'CottonFleeceFrostedBlueberry.jpeg',
                        name: 'Frosted Blueberry',
                    },
                    {
                        image: 'CottonFleeceHeatherSnow.jpeg',
                        name: 'Heather Snow',
                    },
                    {
                        image: 'CottonFleeceBlackLeopard.jpeg',
                        name: 'Black Leopard',
                    },
                ],
            },
            {
                _key: 'FlowOnPointBerryHeather.jpeg',
                description:
                    'The nylon performance legging you love is now supersoft, here with 4-way stretch and a waistband that stays in place for total comfort.',
                heading: 'Flow On Point High Rise Pocket Legging',
                rating: 4.4,
                price: 30.0,
                category: 'SPORT & LOUNGE',
                images: [
                    {
                        image: 'FlowOnPointBerryHeather.jpeg',
                        name: 'Berry Heather',
                    },
                    {
                        image: 'FlowOnPointBeigeLeopard.jpeg',
                        name: 'Beige Leopard',
                    },
                    {
                        image: 'FlowOnPointRoseBegonia.jpeg',
                        name: 'Rose Begonia',
                    },
                ],
            },
            {
                _key: 'ScoopNeckPeony.jpeg',
                description:
                    'A classic closet staple made modern to embody a more contemporary silhouette, this bodysuit has a flattering thong brief that will remain undetectable beneath your clothes.',
                heading: 'Scoop Neck Bodysuit',
                rating: 4.4,
                price: 89,
                category: 'SPORT & LOUNGE',
                images: [
                    {
                        image: 'ScoopNeckPeony.jpeg',
                        name: 'Peony',
                    },
                    {
                        image: 'ScoopNeckLatte.jpeg',
                        name: 'Latte',
                    },
                    {
                        image: 'ScoopNeckBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'StretchFleeceBlue.jpeg',
                description:
                    'An extra-cozy track short in stretch fleece: you’ll want to wear it every day and always.',
                heading: 'Stretch Fleece Track Short',
                rating: 4.5,
                price: 34.5,
                category: 'SPORT & LOUNGE',
                images: [
                    {
                        image: 'StretchFleeceBlue.jpeg',
                        name: 'Blue',
                    },
                    {
                        image: 'StretchFleeceDarkBrown.jpeg',
                        name: 'Dark Brown',
                    },
                    {
                        image: 'StretchFleeceDarkSeafoam.jpeg',
                        name: 'Dark Seafoam',
                    },
                ],
            },
            {
                _key: 'SweatOnEnvious.jpeg',
                description:
                    'Smooth, sleek and comfortable, this classic sport bra gives you support with stay-put cups and classic racerback straps, perfect for runs, hikes, workouts, anything meant to break a sweat.',
                heading: 'Sweat On Point Racerback Sport Bra',
                rating: 3.7,
                price: 44.5,
                category: 'SPORT & LOUNGE',
                images: [
                    {
                        image: 'SweatOnEnvious.jpeg',
                        name: 'Envious',
                    },
                    {
                        image: 'SweatOnBerryBlush.jpeg',
                        name: 'Berry Blush',
                    },
                    {
                        image: 'SweatOnFrostedBlueberry.jpeg',
                        name: 'Frosted Blueberry',
                    },
                ],
            },
            {
                _key: 'VelourAfricanViolet.jpeg',
                description:
                    "Make your lounge style extra comfy cozy with this hoodie's ultra soft velour finish.",
                heading: 'Velour Front-zip Hoodie',
                rating: 4.3,
                price: 49.5,
                category: 'SPORT & LOUNGE',
                images: [
                    {
                        image: 'VelourAfricanViolet.jpeg',
                        name: 'African Violet',
                    },
                    {
                        image: 'VelourNimbusCloud.jpeg',
                        name: 'Nimbus Cloud',
                    },
                    {
                        image: 'VelourNeonPeony.jpeg',
                        name: 'Neon Peony',
                    },
                ],
            },
        ],
    },
    {
        name: 'OrdersTable',
        data: [
            {
                books: [
                    {
                        _id: 'BooksTable/b2',
                        _key: 'b2',
                        _rev: '_bR90GHu--C',
                        author: 'Steve Doocy',
                        category: 'Cookbooks',
                        name: 'The Happy in a Hurry Cookbook',
                        price: 17.99,
                        rating: 4.6,
                    },
                    {
                        _id: 'BooksTable/b3',
                        _key: 'b3',
                        _rev: '_bR90GHy--_',
                        author: 'Kristin Cavallari',
                        category: 'Cookbooks',
                        name: 'True Comfort',
                        price: 17.52,
                        rating: 4.8,
                    },
                ],
                customerId: '56b83d81-940a-4dd4-c2f4-420c41deeca7',
                orderDate: 1603105787506,
                _key: '1603105787506:56b83d81-940a-4dd4-c2f4-420c41deeca7',
            },
        ],
    },
    { name: 'CartTable', data: [] },
    {
        name: 'UsersTable',
        data: [
            {
                customerId: '56b83d81-940a-4dd4-c2f4-420c41deeca7',
                password: '�y|�\u0018�-�d�\u0007�]?�v#\u0004�\u0006=S,�\\^ר�O',
                _key: 'john.d@macrometa.io',
            },
            {
                customerId: '56b83d81-512a-4dd4-c2f4-310c41deeca7',
                password: '�y|�\u0018�-�d�\u0007�]?�v#\u0004�\u0006=S,�\\^ר�O',
                _key: 'harry.d@macrometa.io',
            },
        ],
    },
    {
        name: 'BestsellersTable',
        data: [
            { _key: 'b1', quantity: 1 },
            { _key: 'b5', quantity: 1 },
            { _key: 'b9', quantity: 1 },
            { _key: 'b13', quantity: 1 },
            { _key: 'b17', quantity: 1 },
        ],
    },
    {
        name: 'ZipcodesTable',
        data: [
            {
                // Connecticut (CT)	Hartford
                _key: '0',
                city: 'Hartford, CT',
                county: 'Hartford County',
                coordinates: '41.77, -72.67',
                zipcodes: [
                    {
                        zipcode: '06101',
                        storeName: 'The Shoppes at Buckland Hills',
                        contact: '(416) 205-1222',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '06102',
                        storeName: 'Westfarms VS',
                        contact: '(416) 205-1222',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                    {
                        zipcode: '06103',
                        storeName: 'Westfarms PINK',
                        contact: '(416) 205-1222',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                ],
            },
            {
                // Deleware (DE)	Dover
                _key: '1',
                city: 'Dover, DE',
                county: 'Kent County',
                coordinates: '39.2, -75.5',
                zipcodes: [
                    {
                        zipcode: '19901',
                        storeName: 'Northfield at Stapleton',
                        contact: '(303) 574-3055',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '19902',
                        storeName: 'Dulles Town Center VS',
                        contact: '(703) 444-9690',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '19903',
                        storeName: 'Village at Stone Oak',
                        contact: '(210) 481-0137',
                        closeTime: '6:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                ],
            },
            {
                // District of Columbia (DC)	Washington
                _key: '2',
                city: 'Washington, DC',
                county: 'District of Columbia',
                coordinates: '38.91, -77.02',
                zipcodes: [
                    {
                        zipcode: '20001',
                        storeName: 'Southland PINK',
                        contact: '(734) 287-1830',
                        closeTime: '6:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                    {
                        zipcode: '20002',
                        storeName: 'Tyrone Square',
                        contact: '(727) 347-7190',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '20003',
                        storeName: 'The Outlet Collection',
                        contact: '(253) 804-0105',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                ],
            },
            {
                // Georgia (GA)	Atlanta
                _key: '3',
                city: 'Atlanta, GA',
                county: 'Fulton County',
                coordinates: '33.75, -84.39',
                zipcodes: [
                    {
                        zipcode: '30301',
                        storeName: 'Summit VS',
                        contact: '(330) 835-1554',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '30302',
                        storeName: 'Houston',
                        contact: '(832) 952-3459',
                        closeTime: '9:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '30303',
                        storeName: 'Clackamas Town Center VS',
                        contact: '(503) 652-1752',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                ],
            },
            {
                // Indiana (IN)	Indianapolis
                _key: '4',
                city: 'Indianapolis, IN',
                county: 'Marion County',
                coordinates: '39.78, -86.11',
                zipcodes: [
                    {
                        zipcode: '46201',
                        storeName: 'Twelve Oaks Mall',
                        contact: '(248) 347-0393',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                    {
                        zipcode: '46202',
                        storeName: 'University Park',
                        contact: '(574) 247-4493',
                        closeTime: '6:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '46203',
                        storeName: 'Green Acres PINK',
                        contact: '(516) 593-0276',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                ],
            },
            {
                // Iowa (IA)	Davenport Des Moines
                _key: '5',
                city: 'Davenport, IA',
                county: 'Scott County',
                coordinates: '41.52, -90.57',
                zipcodes: [
                    {
                        zipcode: '52801',
                        storeName: 'Apache Mall',
                        contact: '(507) 281-5066',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '52802',
                        storeName: 'Somerset Collection',
                        contact: '(248) 816-1683',
                        closeTime: '6:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                    {
                        zipcode: '52803',
                        storeName: 'University Park',
                        contact: '(574) 247-4493',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                ],
            },
            {
                // Kansas (KS)	Wichita
                _key: '6',
                city: 'Wichita, KS',
                county: 'Sedgwick County',
                coordinates: '37.686, -97.335',
                zipcodes: [
                    {
                        zipcode: '67201',
                        storeName: 'Fremaux Town Center',
                        contact: '(985) 645-0006',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                    {
                        zipcode: '67202',
                        storeName: 'Shadow Lake Towne Center',
                        contact: '(402) 339-1951',
                        closeTime: '7:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '67203',
                        storeName: 'Columbia',
                        contact: '(509) 736-3917',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                ],
            },
            {
                _key: '7',
                city: 'Tulsa, OK',
                county: 'Tulsa County',
                coordinates: '36.156, -95.994',
                zipcodes: [
                    {
                        zipcode: '74101',
                        storeName: 'Palm Desert Town PINK',
                        contact: '(760) 568-2346',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '74102',
                        storeName: 'Tanger Outlet at Deer Park',
                        contact: '(631) 392-2267',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                    {
                        zipcode: '74103',
                        storeName: 'West Edmonton Mall',
                        contact: '(780) 484-4341',
                        closeTime: '9:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                ],
            },
            {
                _key: '8',
                city: 'Logan, UT',
                county: 'Cache County',
                coordinates: '41.6, -111.7',
                zipcodes: [
                    {
                        zipcode: '84321',
                        storeName: 'Palm Desert Town PINK',
                        contact: '(760) 568-2346',
                        closeTime: '9:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                    {
                        zipcode: '84322',
                        storeName: 'Victor Valley Town',
                        contact: '(760) 955-8162',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '84323',
                        storeName: 'Masonville',
                        contact: '(519) 645-8969',
                        closeTime: '9:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                ],
            },
            {
                _key: '9',
                city: 'Bellevue, WA',
                county: 'King County',
                coordinates: '47.62, -122.21',
                zipcodes: [
                    {
                        zipcode: '98004',
                        storeName: 'Shawnee',
                        contact: '(405) 214-2060',
                        closeTime: '9:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '98005',
                        storeName: 'Rogue Valley',
                        contact: '(541) 245-2711',
                        closeTime: '6:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '98006',
                        storeName: 'The Outlet Collection',
                        contact: '(253) 804-0105',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Open for Customers. Social distancing guidelines throughout the store.',
                    },
                ],
            },
        ],
    },
    {
        name: 'PromotionsTable',
        data: [
            {
                _key: 'DrapedBackVintageRose.jpeg',
                type: 'price',
                message: 'Clearance $21.99',
                price: 21.99,
            },
            {
                _key: 'TahitiScoopOlive.jpeg',
                type: 'link',
                message: 'Get a free Cotton Jogger Tee-jama',
                link: 'CottonJoggerLinenDahlia.jpeg',
            },
        ],
    },
]

const VIEWS = [
    {
        // TODO: Manually add category and heading fields in findFashionItems view
        name: 'findFashionItems',
        properties: {
            links: {
                FashionItemsTable: {
                    analyzers: ['text_en'],
                    fields: {},
                    includeAllFields: true,
                    storeValues: 'none',
                    trackListPositions: false,
                },
            },
        },
    },
]

const collectionHandler = async (client, collection, isEdge) => {
    const { name, data } = collection
    const coll = isEdge ? client.edgeCollection(name) : client.collection(name)
    const exists = await coll.exists()

    const prefix = `${isEdge ? 'Edge ' : ''}Collection ${name}`
    console.log(`${prefix} exists=${exists}`)
    if (!exists) {
        await client.createCollection(name, {}, isEdge)
        console.log(`${prefix} created`)
        if (Array.isArray(data) && data.length)
            if (isEdge) {
                for (edge of data) {
                    await coll.save(data)
                }
            } else {
                await client.insertDocumentMany(name, data)
            }
        console.log(`Data inserted in ${prefix}`)
    } else {
        console.log(`${prefix} already exists. Skipping creation.`)
    }
    return coll
}

const setup = async client => {
    console.log('INIT!!!')
    for (const collection of COLLECTIONS) {
        await collectionHandler(client, collection, false)
    }

    const response = await client.getListOfViews()
    const existingViews = response.result

    for (const view of VIEWS) {
        const { name, properties } = view
        const exists = existingViews.find(
            existingView => existingView.name === name
        )
        if (exists) {
            console.log(`View ${name} exists. Skipping creation.`)
        } else {
            await client.createView(name, properties)
            console.log(`View ${name} created.`)
        }
    }
}

export default setup
