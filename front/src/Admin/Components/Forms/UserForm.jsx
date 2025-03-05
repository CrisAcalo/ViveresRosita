import React, { useState } from "react";

const UserForm = ({ onSave, user, roles }) => {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");
    const [rolId, setRolId] = useState(user?.rolId || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email, password: password || undefined, phone, address, rolId });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
                <span className="text-gray-700">Nombre</span>
                <input type="text" className="border rounded-lg px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Email</span>
                <input type="email" className="border rounded-lg px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Contraseña</span>
                <input type="password" className="border rounded-lg px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="text-sm text-gray-500">{user ? "Déjalo en blanco para no cambiar" : ""}</span>
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Teléfono</span>
                <input type="text" className="border rounded-lg px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Dirección</span>
                <input type="text" className="border rounded-lg px-3 py-2" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Rol</span>
                <select className="border rounded-lg px-3 py-2" value={rolId} onChange={(e) => setRolId(e.target.value)} required>
                    <option value="">Seleccione un rol</option>
                    {/* {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                            {rol.name}
                        </option>
                    ))} */}
                    <option value="1">Admin</option>
                    <option value="3">Customer</option>
                </select>
            </label>

            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Guardar Usuario
            </button>
        </form>
    );
};

export default UserForm;
