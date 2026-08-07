const BEAT_NAMES = {
    'boom-bap': 'Boom Bap Clásico',
    'trap': 'Trap',
    'drill': 'Drill',
    'jazz-boom-bap': 'Jazz Boom Bap',
    'west-coast': 'West Coast'
};

const WORDS = [
    'FLOW', 'CALLE', 'MICRÓFONO', 'BARRIO', 'RIMA', 'FUEGO', 'COMPÁS', 'BATALLA', 'RESPETO', 'PUNCHLINE',
    'BARRAS', 'ESCENARIO', 'TINTA', 'PALABRA', 'MENTE', 'DESTINO', 'SUEÑOS', 'VICTORIA', 'DERROTA', 'CORONA',
    'TRONO', 'LEYENDA', 'RITMO', 'LATIDO', 'TEMPO', 'VERSO', 'ESTILO', 'GUERRERO', 'SOMBRA', 'LUZ',
    'TORMENTA', 'CIELO', 'ASFALTO', 'CADENA', 'LIBERTAD', 'HAMBRE', 'AMBICIÓN', 'ORGULLO', 'VENENO', 'VERDAD',
    'MENTIRA', 'REVOLUCIÓN', 'PODER', 'ENERGÍA', 'ALMA', 'CORAZÓN', 'INSTINTO', 'IMPERIO', 'RELOJ', 'HISTORIA'
];

const TERMINATIONS = [
    'CIÓN', 'UE-O', 'E-O', 'AR', 'A-E', 'IDO', 'O-A', 'AL', 'E-A', 'OR',
    'I-A', 'ADO', 'A-O', 'ER', 'O-E', 'I-O', 'EZ', 'E-E', 'ILLO', 'A-I', 
    'ANTE', 'O-O', 'I-E', 'U-A', 'IMIENTO', 'A-U', 'OSO', 'E-A-O', 'ISTA', 'U-A-O', 
    'ARIO', 'U-E', 'URA', 'O-I', 'ENCIA', 'U-I', 'ERO', 'IA', 'EZA', 'EO', 
    'ARIOS', 'AU', 'ENTE', 'UE', 'INO', 'OI', 'AI', 'ANZA', 'EI', 'AMIENTO', 
    'OU', 'ORIO', 'UA', 'IVO', 'IO', 'ADOR', 'AE', 'EZAS', 'OA', 'ABLES', 
    'A-A', 'ENCIAS', 'A-O-A', 'ORES', 'I-A-O', 'ISMO', 'U-O', 'ABLE', 'I-E-O', 'CIÓNES',
    'O-E-A', 'IDAD', 'A-I-A', 'EZOS', 'I-I'
];

const THEMATIC_WORDS = [
    'DINERO', 'AMOR', 'TIEMPO', 'MUERTE', 'FAMILIA', 'CALLE', 'ESCUELA', 'TRABAJO', 'SUEÑOS', 'MIEDO', 
    'ÉXITO', 'FRACASO', 'LIBERTAD', 'PODER', 'TRAICIÓN', 'AMISTAD', 'VIAJE', 'INFANCIA', 'FUTURO', 'PASADO', 
    'MÚSICA', 'TECNOLOGÍA', 'GUERRA', 'PAZ', 'NATURALEZA', 'CIUDAD', 'SOLEDAD', 'FAMA', 'UNIVERSO', 'REVOLUCIÓN'
]

const BEAT_FILES = {
    'boom-bap': [
        { src: 'Beats/Boom Bap Clasico/Beat 1 BBC.mp3', intro: 10 },
        { src: 'Beats/Boom Bap Clasico/Beat 2 BBC.mp3', intro: 10 },
        { src: 'Beats/Boom Bap Clasico/Beat 3 BBC.mp3', intro: 10 },
        { src: 'Beats/Boom Bap Clasico/Beat 4 BBC.mp3', intro: 10 },
        { src: 'Beats/Boom Bap Clasico/Beat 5 BBC.mp3', intro: 10 }
    ],
    'drill': [
        { src: 'Beats/Drill/Beat 1 Drill.mp3', intro: 13 },
        { src: 'Beats/Drill/Beat 2 Drill.mp3', intro: 26 },
        { src: 'Beats/Drill/Beat 3 Drill.mp3', intro: 20 },
        { src: 'Beats/Drill/Beat 4 Drill.mp3', intro: 14 },
        { src: 'Beats/Drill/Beat 5 Drill.mp3', intro: 13 }
    ],
    'trap': [
        { src: 'Beats/Trap/Beat 1 Trap.mp3', intro: 13 },
        { src: 'Beats/Trap/Beat 2 Trap.mp3', intro: 13 },
        { src: 'Beats/Trap/Beat 3 Trap.mp3', intro: 13 },
        { src: 'Beats/Trap/Beat 4 Trap.mp3', intro: 26 },
        { src: 'Beats/Trap/Beat 5 Trap.mp3', intro: 26 }
    ],
    'jazz-boom-bap': [
        { src: 'Beats/Jazz Boom Bap/Beat 1 JBB.mp3', intro: 22 },
        { src: 'Beats/Jazz Boom Bap/Beat 2 JBB.mp3', intro: 22 },
        { src: 'Beats/Jazz Boom Bap/Beat 3 JBB.mp3', intro: 22 },
        { src: 'Beats/Jazz Boom Bap/Beat 4 JBB.mp3', intro: 22 },
        { src: 'Beats/Jazz Boom Bap/Beat 5 JBB.mp3', intro: 22 }
    ],
    'west-coast': [
        { src: 'Beats/West Coast/Beat 1 WC.mp3', intro: 20 },
        { src: 'Beats/West Coast/Beat 2 WC.mp3', intro: 10 },
        { src: 'Beats/West Coast/Beat 3 WC.mp3', intro: 10 },
        { src: 'Beats/West Coast/Beat 4 WC.mp3', intro: 20 },
        { src: 'Beats/West Coast/Beat 5 WC.mp3', intro: 20 }
    ],
};