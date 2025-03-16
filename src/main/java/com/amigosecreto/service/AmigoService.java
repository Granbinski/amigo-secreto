package com.amigosecreto.service;

import com.amigosecreto.model.Amigo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class AmigoService {

    private final List<Amigo> amigos = new ArrayList<>();

    public List<Amigo> listarTodos() {
        return amigos;
    }

    public Amigo adicionar(Amigo amigo) {
        if (amigo.getNome() == null || amigo.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do amigo não pode estar vazio");
        }
        amigos.add(amigo);
        return amigo;
    }

    public Amigo sortear() {
        if (amigos.isEmpty()) {
            throw new IllegalStateException("Não há amigos na lista para sortear");
        }
        
        Random random = new Random();
        int indice = random.nextInt(amigos.size());
        return amigos.get(indice);
    }

    public void limpar() {
        amigos.clear();
    }
}