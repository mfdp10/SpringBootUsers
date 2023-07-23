package com.cursojava.curso.dao;

import com.cursojava.curso.models.Usuario;

import java.util.List;

public interface UsuarioDao {

    List<Usuario> getUsuarios();

    Usuario obtenerUsuarioPorId(String id);

    void eliminar(Long id);

    void registrar(Usuario u);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
}
