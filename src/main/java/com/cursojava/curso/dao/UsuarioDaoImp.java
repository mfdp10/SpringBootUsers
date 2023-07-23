package com.cursojava.curso.dao;

import com.cursojava.curso.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Usuario> getUsuarios() {
        String query = "FROM Usuario";
        List<Usuario> resultado = entityManager.createQuery(query).getResultList();
        return resultado;
    }

    @Override
    public Usuario obtenerUsuarioPorId(String id) {
        String query = "FROM Usuario where id=:id";
        try {
            Object obj = entityManager.createQuery(query)
                    .setParameter("id", id).getSingleResult();
            System.out.println("Roberto " + obj);
            if (obj != null) {
                return (Usuario) obj;
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
//        if (obj != null) {
//           return (Usuario) obj;
//        }
        return null;
    }

    @Override
    public void eliminar(Long id) {
        Usuario u = entityManager.find(Usuario.class, id);
        entityManager.remove(u);
    }

    @Override
    public void registrar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario obtenerUsuarioPorCredenciales(Usuario usuario) {
        String query = "FROM Usuario where email=:email";
        List<Usuario> resultado = entityManager.createQuery(query)
                .setParameter("email", usuario.getEmail())
                .getResultList();

        if (resultado.isEmpty()) return null;

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(resultado.get(0).getPassword(), usuario.getPassword())) {
            return resultado.get(0);
        }
        return null;

//        if (resultado.isEmpty()) {
//            return false;
//        } else {
//            return true;
//        }
//        return !resultado.isEmpty();
    }
}
