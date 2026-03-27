#!/usr/bin/env python3
"""Script para autenticarse en NotebookLM."""

import asyncio
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

def login_notebooklm():
    storage_path = Path.home() / ".notebooklm" / "storage_state.json"
    storage_path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    
    browser_profile = Path.home() / ".notebooklm" / "browser_profile"
    browser_profile.mkdir(parents=True, exist_ok=True, mode=0o700)
    
    print("Abriendo navegador para login en NotebookLM...")
    print("Por favor, completa el login en el navegador que se abrirá.")
    print("Cuando termines de iniciar sesión en NotebookLM, el navegador se cerrará automáticamente.")
    
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=str(browser_profile),
            headless=False,
            args=['--disable-blink-features=AutomationControlled']
        )
        
        page = browser.new_page()
        page.goto("https://notebooklm.google.com/")
        
        # Keep browser open until user confirms
        print("\nNavegador abierto. Por favor:")
        print("1. Inicia sesión en Google")
        print("2. Espera a que cargue NotebookLM")
        print("3. Cuando estés en la página principal, dime y presionaré ENTER para guardar")
        print("\n(El navegador permanecerá abierto...)")
        
        # Wait for user input
        input("\nPresiona ENTER cuando hayas completado el login...")
        
        # Get cookies/storage state
        storage_state = browser.contexts[0].storage_state()
        
        # Save storage state
        import json
        with open(storage_path, 'w') as f:
            json.dump(storage_state, f)
        
        print(f"\n✓ Estado guardado en: {storage_path}")
        print("✓ Autenticación completada!")
        
        browser.close()

if __name__ == "__main__":
    login_notebooklm()
