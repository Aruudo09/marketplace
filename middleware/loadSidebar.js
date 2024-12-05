const db = require('../db'); // Koneksi database

const loadSidebar = async (req, res, next) => {
    try {
        const idlevel = 1; // Ambil `id_level` dari session atau token pengguna

        // Query menu utama
        const [menus] = await db.query(
            `SELECT b.nama_menu, b.icon, b.link, b.id_menu 
             FROM tbl_akses_menu a
             JOIN tbl_menu b ON a.id_menu = b.id_menu
             JOIN tbl_userlevel c ON a.id_level = c.id_level
             WHERE a.id_level = ${idlevel} AND a.view_level = 'Y' AND b.is_active = 'Y'
             ORDER BY b.urutan ASC`
        );

        // Query submenu untuk setiap menu
        for (const menu of menus) {
            const [submenus] = await db.query(
                `SELECT b.nama_submenu, b.icon, b.link, b.id_submenu 
                 FROM tbl_akses_submenu a
                 JOIN tbl_submenu b ON a.id_submenu = b.id_submenu
                 WHERE a.id_level = ${idlevel} AND b.id_menu = ${menu.id_menu} AND a.view_level = 'Y' AND b.is_active = 'Y'
                 ORDER BY b.urutan ASC`
            );
            menu.submenus = submenus; // Tambahkan submenu ke menu
        }

        // Simpan data menu ke res.locals agar dapat diakses di semua halaman
        res.locals.sidebarMenus = menus;

        next(); // Lanjutkan ke middleware berikutnya
    } catch (error) {
        console.error('Error loading sidebar:', error);
        next(error); // Tangani error dan lanjutkan
    }
};

module.exports = loadSidebar;
