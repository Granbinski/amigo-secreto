package com.amigosecreto.model;

public class Amigo {

  private String nome;

  public Amigo(){

  }

  public Amigo(String nome){
    this.nome = nome;
  }

  public String getNome(){
    return nome;
  }

  public void setNome(String nome){
    this.nome = nome;
  }
  
}
