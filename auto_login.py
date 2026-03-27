#!/usr/bin/env python3
"""Login automático a NotebookLM con timeout."""

import asyncio
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

def main():
    storage_path = Path.home() / ".notebooklm" / "storage_state.json"
    browser_profile = Path.home() / ".notebooklm" / "browser_profile"
    
    print("=" * 60)
    print("INSTRUCCIONES DE LOGIN")
    print("=" * 60)
    print("""
Se abrirá una ventana del navegador. Por favor:
1. Inicia sesión con tu cuenta Google
2. Una vez en la página de NotebookLM (pantalla principal)
3. Mantén la ventana abierta
4. Vuelve aquí y espera...
""")
    
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=str(browser_profile),
            headless=False,
            args=['--disable-blink-features=AutomationControlled']
        )
        
        page = browser.new_page()
        page.goto("https://notebooklm.google.com/")
        
        print("Navegador abierto. Esperando login (120 segundos)...")
        print(">>> Ve al navegador y completa el login ahora <<<")
        
        # Wait for up to 120 seconds for the user to log in
        try:
            # Check if we're logged in by looking for elements that appear after login
            page.wait_for_url("**/notebooklm.google.com/**", timeout=120000)
            
            # Additional check - wait for the main UI to load
            page.wait_for_load_state("networkidle", timeout=30000)
            
            print("\n✓ Login detectado! Guardando cookies...")
            
            # Save storage state - use the correct method
            storage_state = browser.storage_state()
            
            with open(storage_path, 'w') as f:
                json.dump(storage_state, f)
            
            print(f"✓ Guardado en: {storage_path}")
            print("✓ Autenticación completada!")
            
        except Exception as e:
            print(f"\n✗ Error o timeout: {e}")
            print("Por favor, intenta de nuevo.")
        
        # Close browser after a moment
        print("Cerrando navegador en 5 segundos...")
        import time
        time.sleep(5)
        browser.close()

if __name__ == "__main__":
    main()
