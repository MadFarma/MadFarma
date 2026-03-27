#!/usr/bin/env python3
"""Extraer cookies del navegador y guardar como storage_state.json"""

import json
import sqlite3
from pathlib import Path

def extract_cookies():
    cookies_db = Path.home() / ".notebooklm/browser_profile/Default/Cookies"
    
    if not cookies_db.exists():
        print("No se encontró la base de datos de cookies")
        return
    
    conn = sqlite3.connect(str(cookies_db))
    cursor = conn.cursor()
    
    # Get cookies for notebooklm.google.com and google.com
    cursor.execute("""
        SELECT name, value, host_key, path, expires_utc, is_secure, is_httponly, 
               samesite, priority
        FROM cookies
        WHERE host_key LIKE '%.google.com' OR host_key LIKE '%.notebooklm.google.com'
    """)
    
    cookies = []
    for row in cursor.fetchall():
        name, value, host_key, path, expires_utc, is_secure, is_httponly, samesite, priority = row
        
        same_site_map = {0: "No Restriction", 1: "Lax", 2: "Strict"}
        
        cookie = {
            "name": name,
            "value": value,
            "domain": host_key,
            "path": path,
            "expires": expires_utc if expires_utc != -1 else None,
            "httpOnly": bool(is_httponly),
            "secure": bool(is_secure),
            "sameSite": same_site_map.get(samesite, "No Restriction")
        }
        cookies.append(cookie)
    
    conn.close()
    
    # Create storage state
    storage_state = {
        "cookies": cookies,
        "origins": []
    }
    
    # Save
    storage_path = Path.home() / ".notebooklm/storage_state.json"
    storage_path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    
    with open(storage_path, 'w') as f:
        json.dump(storage_state, f, indent=2)
    
    print(f"✓ Extraídos {len(cookies)} cookies")
    print(f"✓ Guardado en: {storage_path}")

if __name__ == "__main__":
    extract_cookies()
