export type Vehicle = {
  name: string
  category: string
  description: string
  image: string
  imageAlt: string
  groups: string[]
  tag?: string
}

const pexelsPhoto = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`

type ModelGroup = 'Cars' | 'Sedans & Touring' | 'SUVs' | 'Electric' | 'BMW M' | 'Coupés & Roadsters'

const modelPhotos = [
  '31041580',
  '12532746',
  '10054994',
  '19892485',
  '16439513',
  '16737678',
  '21287380',
  '34244269',
]

const model = (
  name: string,
  category: string,
  groups: ModelGroup[],
  description: string,
  photoIndex: number,
  tag?: string,
): Vehicle => ({
  name,
  category,
  groups: [
    ...groups,
    ...(!groups.includes('SUVs') && groups.some((group) => group === 'Sedans & Touring' || group === 'Coupés & Roadsters')
      ? ['Cars']
      : []),
  ],
  description,
  image: pexelsPhoto(modelPhotos[photoIndex % modelPhotos.length]),
  imageAlt: 'Illustrative BMW model-family photography; exact trim and market specification may differ',
  ...(tag ? { tag } : {}),
})

export const vehicles: Vehicle[] = [
  model('BMW X3', 'Sports Activity Vehicle', ['SUVs'], 'Versatile by nature. Unmistakable by design.', 0, 'Featured'),
  model('BMW X5', 'Sports Activity Vehicle', ['SUVs'], 'Room for more. Ready for everything.', 1),
  model('BMW X6', 'Sports Activity Coupé', ['SUVs', 'Coupés & Roadsters'], 'A bold silhouette that refuses to blend in.', 2),
  model('BMW 3 Series Sedan', 'Sports Sedan', ['Sedans & Touring'], 'The original connection between road and driver.', 3),
  model('BMW 5 Series Sedan', 'Executive Sedan', ['Sedans & Touring'], 'Executive presence, with a pulse.', 4),
  model('BMW M3 Sedan', 'M High-Performance Sedan', ['BMW M', 'Sedans & Touring'], 'Precision, pushed well beyond the expected.', 5, 'M'),
  model('BMW M4 Coupé', 'M High-Performance Coupé', ['BMW M', 'Coupés & Roadsters'], 'A sharper edge to every moment.', 6, 'M'),
  model('BMW M5 Sedan', 'M High-Performance Sedan', ['BMW M', 'Sedans & Touring'], 'Uncompromising performance, with room to move.', 7, 'M'),
  model('BMW M340i Sedan', 'M Performance Sports Sedan', ['BMW M', 'Sedans & Touring'], 'Everyday versatility with a distinctly athletic edge.', 5, 'M Performance'),
  model('BMW 1 Series', 'Compact Hatchback', ['Sedans & Touring'], 'Agile proportions, built for everyday city life.', 3),
  model('BMW 2 Series Coupé', 'Compact Coupé', ['Coupés & Roadsters'], 'A classic two-door feel with a modern edge.', 6),
  model('BMW 2 Series Gran Coupé', 'Compact Four-Door Coupé', ['Sedans & Touring', 'Coupés & Roadsters'], 'Sleek four-door design with a driver-first character.', 3),
  model('BMW 2 Series Active Tourer', 'Compact Multi-Purpose Vehicle', ['Sedans & Touring'], 'Flexible space with the unmistakable BMW drive.', 1),
  model('BMW 3 Series Touring', 'Sports Touring', ['Sedans & Touring'], 'Dynamic versatility for the long way around.', 4),
  model('BMW 4 Series Coupé', 'Sports Coupé', ['Coupés & Roadsters'], 'A confident coupé silhouette and focused dynamics.', 6),
  model('BMW 4 Series Convertible', 'Sports Convertible', ['Coupés & Roadsters'], 'Open-air driving with a distinctly sporting character.', 2),
  model('BMW 4 Series Gran Coupé', 'Four-Door Coupé', ['Sedans & Touring', 'Coupés & Roadsters'], 'The elegance of a coupé with everyday access.', 3),
  model('BMW M440i Coupé', 'M Performance Coupé', ['BMW M', 'Coupés & Roadsters'], 'A finely tuned balance of agility and grand touring.', 6, 'M Performance'),
  model('BMW M440i Gran Coupé', 'M Performance Four-Door Coupé', ['BMW M', 'Sedans & Touring', 'Coupés & Roadsters'], 'A sporting character in a versatile four-door form.', 3, 'M Performance'),
  model('BMW 5 Series Touring', 'Executive Touring', ['Sedans & Touring'], 'Long-distance comfort meets adaptable space.', 4),
  model('BMW 7 Series Sedan', 'Luxury Sedan', ['Sedans & Touring'], 'A flagship expression of comfort and technology.', 4),
  model('BMW 8 Series Coupé', 'Luxury Coupé', ['Coupés & Roadsters'], 'Long-distance refinement with a dramatic coupé profile.', 6),
  model('BMW 8 Series Convertible', 'Luxury Convertible', ['Coupés & Roadsters'], 'Open-air grand touring with a confident presence.', 2),
  model('BMW 8 Series Gran Coupé', 'Luxury Four-Door Coupé', ['Sedans & Touring', 'Coupés & Roadsters'], 'A sweeping silhouette with room for four.', 3),
  model('BMW i3 Sedan', 'All-Electric Sedan · Neue Klasse', ['Electric', 'Sedans & Touring'], 'A new-generation electric sedan from the Neue Klasse family.', 3, 'New'),
  model('BMW i4 Gran Coupé', 'All-Electric Four-Door Coupé', ['Electric', 'Sedans & Touring', 'Coupés & Roadsters'], 'All-electric driving in a versatile Gran Coupé form.', 6),
  model('BMW i5 Sedan', 'All-Electric Executive Sedan', ['Electric', 'Sedans & Touring'], 'Executive comfort with all-electric power.', 4),
  model('BMW i5 Touring', 'All-Electric Executive Touring', ['Electric', 'Sedans & Touring'], 'Electric versatility for everyday journeys and beyond.', 1),
  model('BMW i7 Sedan', 'All-Electric Luxury Sedan', ['Electric', 'Sedans & Touring'], 'An all-electric flagship with first-class refinement.', 4),
  model('BMW X1', 'Compact Sports Activity Vehicle', ['SUVs'], 'Compact dimensions, ready-for-more versatility.', 1),
  model('BMW X2', 'Sports Activity Coupé', ['SUVs', 'Coupés & Roadsters'], 'A confident coupé-inspired take on the compact SAV.', 2),
  model('BMW X4', 'Sports Activity Coupé', ['SUVs', 'Coupés & Roadsters'], 'A distinctive coupé profile in a versatile BMW X form.', 2),
  model('BMW X7', 'Luxury Sports Activity Vehicle', ['SUVs'], 'Three-row space with unmistakable flagship presence.', 1),
  model('BMW iX1', 'All-Electric Compact SAV', ['Electric', 'SUVs'], 'Electric mobility in a versatile compact SUV.', 1),
  model('BMW iX2', 'All-Electric Sports Activity Coupé', ['Electric', 'SUVs', 'Coupés & Roadsters'], 'Electric range meets a distinctive coupé profile.', 2),
  model('BMW iX3', 'All-Electric SAV · Neue Klasse', ['Electric', 'SUVs'], 'The next chapter of all-electric BMW sport activity.', 0, 'New'),
  model('BMW iX', 'All-Electric SAV', ['Electric', 'SUVs'], 'Progressive electric mobility with spacious refinement.', 1),
  model('BMW iX5', 'All-Electric SAV', ['Electric', 'SUVs'], 'A new electric chapter for the BMW X5 family.', 1, 'New'),
  model('BMW Z4 Roadster', 'Two-Seat Roadster', ['Coupés & Roadsters'], 'A pure open-top sports car experience.', 2),
  model('BMW XM', 'M High-Performance Plug-In Hybrid SAV', ['BMW M', 'SUVs'], 'Bold M character with plug-in hybrid power.', 7, 'M'),
  model('BMW M2 Coupé', 'M High-Performance Coupé', ['BMW M', 'Coupés & Roadsters'], 'Compact proportions. Unmistakable M intensity.', 6, 'M'),
  model('BMW M3 Touring', 'M High-Performance Touring', ['BMW M', 'Sedans & Touring'], 'Track-bred precision with touring-car versatility.', 5, 'M'),
  model('BMW M4 Convertible', 'M High-Performance Convertible', ['BMW M', 'Coupés & Roadsters'], 'Open-air thrills with uncompromising M character.', 6, 'M'),
  model('BMW M5 Touring', 'M High-Performance Touring', ['BMW M', 'Sedans & Touring'], 'High performance meets the freedom of extra space.', 7, 'M'),
  model('BMW X5 M', 'M High-Performance SAV', ['BMW M', 'SUVs'], 'M power and precision in a commanding SUV.', 7, 'M'),
  model('BMW X6 M', 'M High-Performance Sports Activity Coupé', ['BMW M', 'SUVs', 'Coupés & Roadsters'], 'A high-performance coupé-SAV with unmistakable M presence.', 2, 'M'),
  model('BMW M8 Coupé', 'M High-Performance Luxury Coupé', ['BMW M', 'Coupés & Roadsters'], 'Grand touring luxury at the heart of M performance.', 6, 'M'),
  model('BMW M8 Convertible', 'M High-Performance Luxury Convertible', ['BMW M', 'Coupés & Roadsters'], 'Open-top grand touring with uncompromising M power.', 2, 'M'),
  model('BMW M8 Gran Coupé', 'M High-Performance Four-Door Coupé', ['BMW M', 'Sedans & Touring', 'Coupés & Roadsters'], 'Four-door elegance paired with M performance.', 5, 'M'),
]

export const modelGroups = [
  'All models',
  'Cars',
  'SUVs',
  'Electric',
  'BMW M',
  'Coupés & Roadsters',
] as const

export const x3Gallery = [
  {
    src: pexelsPhoto('31041580'),
    alt: 'Black BMW X3, three-quarter exterior view',
    label: 'Sculpted exterior',
  },
  {
    src: pexelsPhoto('31041578'),
    alt: 'Black BMW X3, direct front view',
    label: 'Confident front design',
  },
  {
    src: pexelsPhoto('17940818'),
    alt: 'BMW interior detail',
    label: 'Driver-focused interior',
  },
]

export const technologyFeatures = [
  {
    id: 'idrive',
    label: 'BMW iDrive',
    eyebrow: 'A more natural connection',
    title: 'The road ahead, within reach.',
    body: 'A sculpted curved display and intuitive controls bring navigation, entertainment, and vehicle information together around the driver.',
    image: pexelsPhoto('17940818'),
    imageAlt: 'BMW cockpit and modern driver-focused interior',
    icon: 'display',
  },
  {
    id: 'assistance',
    label: 'Driver assistance',
    eyebrow: 'Confidence, built in',
    title: 'More awareness. More ease.',
    body: 'Available driver-assistance systems can help monitor your surroundings and support a more assured drive. Features vary by model and configuration.',
    image: pexelsPhoto('31041578'),
    imageAlt: 'BMW X3 front design representing driver-assistance technology',
    icon: 'shield',
  },
  {
    id: 'connected',
    label: 'ConnectedDrive',
    eyebrow: 'Your world, in sync',
    title: 'Seamlessly connected.',
    body: 'Connected services bring select apps, remote features, and real-time information into your BMW. Availability depends on vehicle and market.',
    image: pexelsPhoto('19892485'),
    imageAlt: 'BMW on the road representing connected driving',
    icon: 'signal',
  },
  {
    id: 'electric',
    label: 'Electric mobility',
    eyebrow: 'A different kind of drive',
    title: 'An electric future. The BMW feeling.',
    body: 'Discover BMW electric mobility, where immediate response and considered design bring a new dimension to every journey.',
    image: pexelsPhoto('10054994'),
    imageAlt: 'BMW SUV in blue evening light',
    icon: 'bolt',
  },
]
