// CACHE_NAME y PRECACHE_ASSETS los genera tools/build-sw.js (npm run build:sw).
const CACHE_NAME = 'mythic-plus-a54365c5a9';

// Todo lo que la app necesita para funcionar sin conexión.
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './privacidad.html',
    './manifest.json',
    './css/tailwind.css',
    './data/classes.json',
    './data/dungeons.json',
    './vendor/chart.umd.min.js',
    './vendor/fontawesome/fa-solid-subset.woff2',
    './vendor/fontawesome/icons.css',
    './vendor/fonts/cinzel-latin-600-normal.woff2',
    './vendor/fonts/cinzel-latin-700-normal.woff2',
    './vendor/fonts/cinzel-latin-800-normal.woff2',
    './vendor/fonts/fonts.css',
    './vendor/fonts/inter-latin-300-normal.woff2',
    './vendor/fonts/inter-latin-400-normal.woff2',
    './vendor/fonts/inter-latin-500-normal.woff2',
    './vendor/fonts/inter-latin-600-normal.woff2',
    './vendor/fonts/inter-latin-700-normal.woff2',
    './images/altar-of-fangs.webp',
    './images/apple-touch-icon.png',
    './images/den-of-nalorakk.webp',
    './images/favicon-32.png',
    './images/kings-rest.webp',
    './images/launchericon-144x144.png',
    './images/launchericon-192x192.png',
    './images/launchericon-48x48.png',
    './images/launchericon-512x512.png',
    './images/launchericon-72x72.png',
    './images/launchericon-96x96.png',
    './images/maskable-192.png',
    './images/maskable-512.png',
    './images/murder-row.webp',
    './images/ruby-life-pools.webp',
    './images/spells/ability_boss_kilrogg_heartseeker.jpg',
    './images/spells/ability_bossfellord_felfissure.jpg',
    './images/spells/ability_bossfellord_felspike.jpg',
    './images/spells/ability_butcher_whirl.jpg',
    './images/spells/ability_creature_amber_01.jpg',
    './images/spells/ability_creature_amber_02.jpg',
    './images/spells/ability_creature_disease_01.jpg',
    './images/spells/ability_creature_disease_02.jpg',
    './images/spells/ability_creature_felfrenzy.jpg',
    './images/spells/ability_creature_poison_01.jpg',
    './images/spells/ability_creature_poison_02.jpg',
    './images/spells/ability_creature_poison_03.jpg',
    './images/spells/ability_creature_poison_05.jpg',
    './images/spells/ability_creature_poison_06.jpg',
    './images/spells/ability_deathknight_asphixiate.jpg',
    './images/spells/ability_deathknight_bonegrinder.jpg',
    './images/spells/ability_deathknight_deathsiphon.jpg',
    './images/spells/ability_deathknight_frozencenter.jpg',
    './images/spells/ability_deathknight_icygrip.jpg',
    './images/spells/ability_deathknight_pillaroffrost.jpg',
    './images/spells/ability_demonhunter_bloodlet.jpg',
    './images/spells/ability_demonhunter_consumemagic.jpg',
    './images/spells/ability_druid_challangingroar.jpg',
    './images/spells/ability_druid_demoralizingroar.jpg',
    './images/spells/ability_druid_ravage.jpg',
    './images/spells/ability_evoker_fontofmagic_green.jpg',
    './images/spells/ability_evoker_fontofmagic_red.jpg',
    './images/spells/ability_evoker_quell.jpg',
    './images/spells/ability_felarakkoa_feldetonation_green.jpg',
    './images/spells/ability_fixated_state_red.jpg',
    './images/spells/ability_hunter_beastsoothe.jpg',
    './images/spells/ability_hunter_cobrastrikes.jpg',
    './images/spells/ability_hunter_snaketrap.jpg',
    './images/spells/ability_hunter_swiftstrike.jpg',
    './images/spells/ability_karoz_leap.jpg',
    './images/spells/ability_kick.jpg',
    './images/spells/ability_mage_coldasice.jpg',
    './images/spells/ability_monk_clashingoxcharge.jpg',
    './images/spells/ability_monk_cracklingjadelightning.jpg',
    './images/spells/ability_monk_legsweep.jpg',
    './images/spells/ability_monk_spearhand.jpg',
    './images/spells/ability_mount_voidelfstridermount.jpg',
    './images/spells/ability_paladin_enlightenedjudgements.jpg',
    './images/spells/ability_paladin_infusionoflight.jpg',
    './images/spells/ability_poisonsting.jpg',
    './images/spells/ability_priest_flashoflight.jpg',
    './images/spells/ability_priest_silence.jpg',
    './images/spells/ability_racial_darkflight.jpg',
    './images/spells/ability_rogue_bloodyeye.jpg',
    './images/spells/ability_rogue_imrovedrecuperate.jpg',
    './images/spells/ability_rogue_kidneyshot.jpg',
    './images/spells/ability_shaman_cleansespirit.jpg',
    './images/spells/ability_shaman_echooftheelements.jpg',
    './images/spells/ability_skyreach_four_wind.jpg',
    './images/spells/ability_vehicle_electrocharge.jpg',
    './images/spells/ability_warlock_chaosbolt.jpg',
    './images/spells/ability_warlock_demonicempowerment.jpg',
    './images/spells/ability_warlock_shadowfurytga.jpg',
    './images/spells/ability_warlock_soullink.jpg',
    './images/spells/ability_warrior_safeguard.jpg',
    './images/spells/ability_warrior_shockwave.jpg',
    './images/spells/ability_warrior_titansgrip.jpg',
    './images/spells/achievement_bg_xkills_avgraveyard.jpg',
    './images/spells/achievement_brewery_2.jpg',
    './images/spells/creatureportrait_cyclone_nodebris.jpg',
    './images/spells/inv12_apextalent_mage_handoffrost.jpg',
    './images/spells/inv_-misc_herb_marrowroot_leaf.jpg',
    './images/spells/inv_10_elementalshardfoozles_earth.jpg',
    './images/spells/inv_111_hunter_ability_harrierscall.jpg',
    './images/spells/inv_112_rogue_betweentheeyes.jpg',
    './images/spells/inv_1205_voidforge_sovereignvoidcores_cosmicvoid.jpg',
    './images/spells/inv_121_trinket_raid_ulatek_heart.jpg',
    './images/spells/inv_ability_druid_convokethespirits.jpg',
    './images/spells/inv_ability_druidoftheclawdruid_ravage.jpg',
    './images/spells/inv_ability_holyfire_buff.jpg',
    './images/spells/inv_ability_holyfire_missile.jpg',
    './images/spells/inv_ability_holyfire_orb.jpg',
    './images/spells/inv_ability_poison_beam.jpg',
    './images/spells/inv_ability_poison_missile.jpg',
    './images/spells/inv_ability_voidweaverpriest_entropicrift.jpg',
    './images/spells/inv_achievement_dungeon_altaroffangs.jpg',
    './images/spells/inv_amanibearmount_witherbark.jpg',
    './images/spells/inv_ammo_arrow_03.jpg',
    './images/spells/inv_axe_09.jpg',
    './images/spells/inv_bone_skull_04.jpg',
    './images/spells/inv_cosmicvoid_groundsate.jpg',
    './images/spells/inv_cosmicvoid_missile.jpg',
    './images/spells/inv_cosmicvoid_orb.jpg',
    './images/spells/inv_cosmicvoid_wave.jpg',
    './images/spells/inv_crate_08.jpg',
    './images/spells/inv_desertlasherorchid_yellow.jpg',
    './images/spells/inv_enchant_voidsphere.jpg',
    './images/spells/inv_eng_bombfire.jpg',
    './images/spells/inv_gauntlets_04.jpg',
    './images/spells/inv_herbalism_70_dreamleaf.jpg',
    './images/spells/inv_knife_1h_felfireraid_d_04.jpg',
    './images/spells/inv_knife_1h_ulatekfang_d_01_poison.jpg',
    './images/spells/inv_legendary_gun.jpg',
    './images/spells/inv_misc_food_83_talbuksteak.jpg',
    './images/spells/inv_misc_gem_pearl_04.jpg',
    './images/spells/inv_misc_volatilewater.jpg',
    './images/spells/inv_pet_toad_brown.jpg',
    './images/spells/inv_raptortravelform.jpg',
    './images/spells/inv_relics_totemofrage.jpg',
    './images/spells/inv_sonic_debuff.jpg',
    './images/spells/inv_spear_08.jpg',
    './images/spells/inv_staff_15.jpg',
    './images/spells/inv_throwingknife_04.jpg',
    './images/spells/inv_vulturemount_black.jpg',
    './images/spells/spell_arcane_arcane02.jpg',
    './images/spells/spell_chargepositive.jpg',
    './images/spells/spell_deathknight_antimagiczone.jpg',
    './images/spells/spell_deathknight_butcher2.jpg',
    './images/spells/spell_deathknight_mindfreeze.jpg',
    './images/spells/spell_druid_thrash.jpg',
    './images/spells/spell_festergutgas.jpg',
    './images/spells/spell_fire_blueflamering.jpg',
    './images/spells/spell_fire_felfirenova.jpg',
    './images/spells/spell_fire_felfireward.jpg',
    './images/spells/spell_fire_felflamering_red.jpg',
    './images/spells/spell_fire_felrainoffire.jpg',
    './images/spells/spell_fire_firebolt.jpg',
    './images/spells/spell_fire_flameshock.jpg',
    './images/spells/spell_fire_totemofwrath.jpg',
    './images/spells/spell_fire_twilightflamebolt.jpg',
    './images/spells/spell_frost_iceshard.jpg',
    './images/spells/spell_frost_iceshock.jpg',
    './images/spells/spell_frost_ring-of-frost.jpg',
    './images/spells/spell_frost_windwalkon.jpg',
    './images/spells/spell_holy_dispelmagic.jpg',
    './images/spells/spell_holy_nullifydisease.jpg',
    './images/spells/spell_holy_purify.jpg',
    './images/spells/spell_holy_purifyingpower.jpg',
    './images/spells/spell_holy_rebuke.jpg',
    './images/spells/spell_holy_removecurse.jpg',
    './images/spells/spell_holy_renew.jpg',
    './images/spells/spell_holy_sealofmight.jpg',
    './images/spells/spell_misc_zandalari_council_soulswap.jpg',
    './images/spells/spell_nature_brilliance.jpg',
    './images/spells/spell_nature_chainlightning.jpg',
    './images/spells/spell_nature_corrosivebreath.jpg',
    './images/spells/spell_nature_cyclone.jpg',
    './images/spells/spell_nature_drowsy.jpg',
    './images/spells/spell_nature_earthquake.jpg',
    './images/spells/spell_nature_healingway.jpg',
    './images/spells/spell_nature_lightning.jpg',
    './images/spells/spell_nature_lightningoverload.jpg',
    './images/spells/spell_nature_lightningshield.jpg',
    './images/spells/spell_nature_nullifydisease.jpg',
    './images/spells/spell_nature_poisoncleansingtotem.jpg',
    './images/spells/spell_nature_purge.jpg',
    './images/spells/spell_nature_regenerate.jpg',
    './images/spells/spell_nature_removecurse.jpg',
    './images/spells/spell_nature_shamanrage.jpg',
    './images/spells/spell_nature_unrelentingstorm.jpg',
    './images/spells/spell_nature_wispsplodegreen.jpg',
    './images/spells/spell_sandelemental.jpg',
    './images/spells/spell_shadow_lifedrain.jpg',
    './images/spells/spell_shadow_mindrot.jpg',
    './images/spells/spell_shadow_plaguecloud.jpg',
    './images/spells/spell_shadow_psychicscream.jpg',
    './images/spells/spell_shadow_requiem.jpg',
    './images/spells/spell_shaman_earthlivingweapon.jpg',
    './images/spells/spell_shaman_earthquake.jpg',
    './images/spells/spell_shaman_staticshock.jpg',
    './images/spells/spell_warlock_demonicportal_purple.jpg',
    './images/spells/trade_archaeology_bones-of-transformation.jpg',
    './images/spells/trade_archaeology_troll_voodoodoll.jpg',
    './images/spells/trade_archaeology_whitehydrafigurine.jpg',
    './images/spells/warlock_curse_shadow.jpg',
    './images/temple-of-sethraliss.webp',
    './images/the-blinding-vale.webp',
    './images/voidscar-arena.webp',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
    );
    self.skipWaiting();
});

// Borra cachés de versiones anteriores para que no se queden diseños viejos.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(
                names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
            ))
            .then(() => self.clients.claim())
    );
});

function putInCache(request, response) {
    if (response && response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
}

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    // Navegación (abrir la app / recargar): red primero, caché si estás offline.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => putInCache(request, response))
                .catch(() => caches.match(request, { ignoreSearch: true })
                    .then(cached => cached || caches.match('./index.html')))
        );
        return;
    }

    // Solo manejamos recursos propios; lo externo (enlaces a Wowhead, etc.) pasa directo.
    if (new URL(request.url).origin !== self.location.origin) return;

    // Recursos estáticos: caché primero y se actualiza en segundo plano.
    event.respondWith(
        caches.match(request).then(cached => {
            const network = fetch(request)
                .then(response => putInCache(request, response))
                .catch(() => cached);
            return cached || network;
        })
    );
});
