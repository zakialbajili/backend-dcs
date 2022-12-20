const prisma = require("../helpers/database")
const bcrypt = require("bcrypt")

class __seeder {
    migrateSeeder = async () => {
        try {
            await prisma.supplier.createMany({
                data: [
                    { name: "SSP", email: "ssp@ssp.com", phone: "08123456701", address: "ssp" },
                    { name: "HPP", email: "hpp@hpp.com", phone: "08123456702", address: "hpp" },
                    { name: "VB", email: "vb@vb.com", phone: "08123456703", address: "vb" },
                    { name: "SUZUKI", email: "suzuki@suzuki.com", phone: "08123456704", address: "suzuki" },
                    { name: "KANIGARA", email: "kanigara@kanigara.com", phone: "08123456705", address: "kanigara" },
                    { name: "INOAC", email: "inoac@inoac.com", phone: "08123456706", address: "inoac" },
                    { name: "IKUYO", email: "ikuyo@ikuyo.com", phone: "08123456707", address: "ikuyo" },
                ],
                skipDuplicates: true,
            })

            await prisma.authUser.createMany({
                data: [
                    { nisp: "20220612", password: bcrypt.hashSync("20220612", 10) },
                    { nisp: "20220712", password: bcrypt.hashSync("20220712", 10) },
                    { nisp: "20220812", password: bcrypt.hashSync("20220812", 10) }
                ],
                skipDuplicates: true,
            })

            await prisma.authRole.createMany({
                data: [
                    { name: "Admin Material" },
                    { name: "Admin Finish Good" },
                    { name: "Manager/BOD" }
                ],
                skipDuplicates: true,
            })

            await prisma.authUserRole.createMany({
                data: [
                    { auth_user_id: 1, auth_role_id: 1 },
                    { auth_user_id: 2, auth_role_id: 2 },
                    { auth_user_id: 3, auth_role_id: 3 },
                ],
                skipDuplicates: true
            })

            await prisma.material.createMany({
                data: [
                    { material_number: "PP-TD10-GY", material_name: "PP-TD10 MM713H CMH20013 GREY", supplier_id: 1 },
                    { material_number: "PP-TD10-BG", material_name: "PP-TD10 MM713H CMY20008 BEIGE", supplier_id: 2 },
                    { material_number: "PP-TD25-MM755H", material_name: "PP-TD-25 MM755H CMX20007 Black", supplier_id: 4 },
                    { material_number: "HY-PMMA+ASA-G", material_name: "WX-9950UD", supplier_id: 5 },
                    { material_number: "HY-ASA22-B", material_name: "WR-9330IDG", supplier_id: 5 },
                    { material_number: "PC-SC1220-UR", material_name: "SAMSUNG SC-1220UR/G02164", supplier_id: 5 },
                    { material_number: "PP-TD20-AP-BP31", material_name: "PP+E/P-TD20 AP-BP-31 Black", supplier_id: 6 },
                ]
            })

            await prisma.batchMaterial.createMany({
                data: [
                    { batch_material_number: "PLAS-PRT-14050", batch_material_name: "PLASTIC PROT 140MMX200MX50MC", type: "B", min_stock: 1000, max_stock: 10000, supplier_id: 2 },
                    { batch_material_number: "MB-MW6050B", batch_material_name: "MW-6050BMASWITEMASTERBATCH", type: "B", min_stock: 1000, max_stock: 10000, supplier_id: 2 },
                    { batch_material_number: "MB-LMN-7893-BO", batch_material_name: "MB Lumine Black 7893-BO", type: "B", min_stock: 1000, max_stock: 10000, supplier_id: 3 },
                    { batch_material_number: "MB-PLM-302S", batch_material_name: "MASTER BATCH PLAMASTER JB302S", type: "B", min_stock: 1000, max_stock: 10000, supplier_id: 4 },
                    { batch_material_number: "MB-LMN-6170", batch_material_name: "LUMINE BLACK 6170-BC", type: "B", min_stock: 1000, max_stock: 10000, supplier_id: 7 },
                ], skipDuplicates: true
            })

            await prisma.rack.createMany({
                data: [
                    { rack_number: "R-HPS11", rack_name: "Rack HPS11", type: "M", address: "A1.01.01", max_capacity: 3000000, supplier_id: 2 },
                    { rack_number: "R-MB35", rack_name: "Rack MB35", type: "B", address: "B1.02.02", max_capacity: 1000000, supplier_id: 2 },
                    { rack_number: "R-HPS12", rack_name: "Rack HPS12", type: "M",  address: "C1.03.03", max_capacity: 3000000, supplier_id: 2 },
                    { rack_number: "R-MB36", rack_name: "Rack MB36", type: "B", address: "D1.04.04", max_capacity: 1000000, supplier_id: 2 },
                    { rack_number: "R-HPS13", rack_name: "Rack HPS13", type: "M",  address: "A1.01.01", max_capacity: 4000000, supplier_id: 2 },
                    { rack_number: "R-MB37", rack_name: "Rack MB37", type: "B", address: "B1.02.02", max_capacity: 1000000, supplier_id: 2 },
                    { rack_number: "R-HPS14", rack_name: "Rack HPS14", type: "M",  address: "A1.01.01", max_capacity: 1000000, supplier_id: 2 },
                    { rack_number: "R-MB38", rack_name: "Rack MB38", type: "B", address: "B1.02.02", max_capacity: 1000000, supplier_id: 2 },
                    { rack_number: "R-HPS15", rack_name: "Rack HPS15", type: "M", address: "A1.01.01", max_capacity: 2000000, supplier_id: 5 },
                    { rack_number: "R-MB39", rack_name: "Rack MB39", type: "B", address: "B1.02.02", max_capacity: 2000000, supplier_id: 5 },
                    { rack_number: "R-HPS16", rack_name: "Rack HPS16", type: "M",  address: "C1.03.03", max_capacity: 800000, supplier_id: 5 },
                    { rack_number: "R-MB40", rack_name: "Rack MB40", type: "B", address: "D1.04.04", max_capacity: 3000000, supplier_id: 5 },
                    { rack_number: "R-HPS17", rack_name: "Rack HPS17", type: "M",  address: "A1.01.01", max_capacity: 1000000, supplier_id: 5 },
                    { rack_number: "R-MB41", rack_name: "Rack MB41", type: "B", address: "B1.02.02", max_capacity: 1000000, supplier_id: 5 },
                    { rack_number: "R-HPS18", rack_name: "Rack HPS18", type: "M",  address: "A1.01.01", max_capacity: 1000000, supplier_id: 5 },
                    { rack_number: "R-MB42", rack_name: "Rack MB42", type: "B", address: "B1.02.02", max_capacity: 1000000, supplier_id: 5 },
                ]
            })

            await prisma.part.createMany({
                data: [
                    { part_number: "IT01-RBL0105-XX-XX", part_name: "GARNISH RR BUMPER LWR (IPL)", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1500, supplier_id: 1, material_id: 1, batch_material_id: null },
                    { part_number: "IT02-CAF0200-XX-XX", part_name: "CONSOLE FLOOR FR LWR", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1400, supplier_id: 3, material_id: null, batch_material_id: 3 }, 
                    { part_number: "IK01-GTG0101-XX-XX", part_name: "Tailgate Ikuyo", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1300, supplier_id: 2, material_id: 2, batch_material_id: 1 }, 
                    { part_number: "HM02-GTU0101-XX-XX", part_name: "GARNISH TAILGATE UPR (IPL)", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1500, supplier_id: 2, material_id: 2, batch_material_id: 2 },
                    { part_number: "51787-OK070-C /51788-OK070-C", part_name: "REINFORCEMENT STEP RH/LH", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1400, supplier_id: 4, material_id: 3, batch_material_id: 4 },
                    { part_number: "72959-X7A01-A", part_name: "SPACER RR SEAT TURN SIDE", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1300, supplier_id: 5, material_id: 4, batch_material_id: null },
                    { part_number: "69743-BZ040-C0", part_name: "BUTTON DOOR LOCKING 202B", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1600, supplier_id: 5, material_id: 5, batch_material_id: null }, 
                    { part_number: "51727-OK110-C / 51728-OK110-C", part_name: "REINFORCEMENT BODY RH/LH", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1500, supplier_id: 6, material_id: 6, batch_material_id: null }, 
                    { part_number: "NPUL-A083QBFA", part_name: "MINI PULSATOR", die_cavity: 1, cycle_time: 64, target_pcs_per_shit: 320, part_weight: 1000, runner: 20, dango: 10, min_stock: 50, max_stock: 100, quantity: 1400, supplier_id: 7, material_id: null, batch_material_id: 5 }               
                ]
            })

            return {
                status: true,
                code: 200
            }
        } catch (error) {
            console.error('seeder module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new __seeder